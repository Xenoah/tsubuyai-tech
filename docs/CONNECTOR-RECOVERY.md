# GitHub接続のみで行うPR前検証

入口のREADME.md、共通規則、全キャラクター規則を最新mainの同じSHAで読むことは変わりません。この文書は接続障害への保守対応であり、通常の記事更新でワークフローや編集基準を変更する許可ではありません。

## 2026-10-16に確認した問題

ローカルの `git ls-remote` は `Could not resolve host: github.com` で失敗しました。一方、許可済みGitHub接続の読み取り・ブランチ操作は利用でき、ローカルにはNode.js 22もありました。Gitの通信失敗だけからGitHub接続全体やNode実行環境がないと判断してはいけません。

既存のpages.ymlはmainへのpush、pull_request、workflow_dispatchで起動します。接続ツールにworkflow_dispatch操作がない環境では、PR作成前にテスト成功を要求する手順と、PR作成後に初めて動くCIとの間で作業が止まります。

## 事前検証専用ワークフロー

`.github/workflows/news-preflight.yml` は `news/` または `maintenance/` で始まる作業ブランチの作成・pushを検知します。手動起動も同じブランチ制限に従います。タグやmainでは検証ジョブを実行しません。

イベントのコミットSHAを指定してcheckoutし、実際のHEADとの一致を確認した後、Node.js 22で次を実行します。

```sh
npm run brief -- all
npm test
npm run build
cat dist/manifest.json
```

権限はcontents: readのみ。認証情報をcheckoutに保持せず、リポジトリへの書き込み、PR作成、マージ、Pages配信、成果物の公開は行いません。既存のpages.ymlのPR検証・main配信も変更しません。

## 接続ツールを使う更新手順

1. 最新mainのHEADを記録し、READMEから指定された全文と既存記事を接続ツールで読む。各取得のrefに記録したSHAを指定する。読み取りが成功しているなら、ローカルGitのDNSエラーを接続権限不足と混同しない。
2. 更新候補がなければ0件で終了する。更新候補がある場合だけmainを再確認し、その最新SHAから一意な `news/<実行識別子>` ブランチを新規作成する。他の実行のブランチを使い回さない。mainが進んでいた場合は規則・既存記事も読み直す。
3. ブランチ作成によるpreflightのログから、そのSHAの `npm run brief -- all` の結果を取得する。規則ハッシュと既存記事・出典URLを確認してから記事を編集する。ログが取得できなければ実行済み・読了済みと扱わない。
4. 許可された記事ファイルだけを接続ツールで作業ブランチへ追加・訂正・撤回する。更新では現在のファイルSHAを照合し、親コミット・ブランチHEADも確認する。mainへ直接書き込まず、force pushしない。
5. 最終pushに対応するpreflightの完了を確認する。workflowのパス、head_branch、head_shaが全て一致し、brief・test・buildの各stepがsuccessであることを確認する。queued、in_progress、skipped、cancelledを成功扱いしない。この条件を満たす前にPRを作らない。
6. GitHub接続でPRを作成し、既存PagesワークフローのPR検証も確認する。PRの差分が依頼範囲内で、既存記事・他者変更を上書きしていないこと、mergeableであることを確認する。
7. PR作成後およびマージ直前にmainを再確認する。検証時のbaseから進んでいれば最新mainに追従し、重複・競合・全差分を再確認してtestとbuildを再実行する。最新mainから新しい作業ブランチへ必要な差分だけ再適用する方法でもよい。古いPRを無理にマージしない。
8. 全条件が成功した場合だけ、検証したPR head SHAをexpected_head_shaに指定してPRをマージする。GitHubの自動マージ設定を変更する必要はない。条件確認後に接続ツールがマージ操作を実行する。
9. マージコミットSHAに一致するpages.ymlのbuild/deploy成功と、通常URLのPages manifest/feed/bootstrapの一致を確認する。保存、検証、配信を区別する。

Actionsの照会では `actions/workflows/news-preflight.yml/runs?branch=<ブランチ名>&head_sha=<SHA>` 等を使い、返却された実行情報でもSHAとブランチを照合します。PRイベントだけを検索するラッパーでは、push/createのpreflightを見落とすため使い分けてください。ログ内の原資料確認欄は自己申告を含み、CI成功が記事の真偽確認を代行するわけではありません。

## 失敗時

DNS、認証、権限、取得、実行、テスト、競合、配信のどの段階で失敗したかを具体的に報告します。許可済みの接続経路とCIを使うことは、テスト省略や権限回避ではありません。追加トークンの探索・保存や、検証条件の緩和はしません。

CI失敗・不明な差分・未確認の一次情報がある実行はマージせず停止します。一時的な失敗では当該実行の公開だけを止め、利用者の明示的な停止指示がないのに毎時タスク自体を無効化しません。次回は最新mainから再評価し、未検証の候補を自動的に持ち越して公開しないでください。
