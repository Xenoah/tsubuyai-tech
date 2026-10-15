# 運用

- リポジトリ: https://github.com/Xenoah/tsubuyai-tech
- 公開ブランチ: main
- 配信: `.github/workflows/pages.yml` が検証・ビルド後、GitHub Pagesへデプロイ。
- リリース: `.github/workflows/release.yml` がpackage.jsonのバージョンとdocs/releasesの説明からタグ・配信ZIP・単体HTML・SHA-256を公開。既存リリースは上書きしない。
- ニュース更新: 外部のGPT定期タスクからmainへcommit/pushする。GitHub Actionsのcronだけで記事を生成する構成ではない。

## 2026-10-15 初回公開作業

ローカルとGitHub Actionsの両方で14テスト・静的ビルドに合格。5キャラクター・7ポストをmainに保存済み。

- 初回実装コミット: `b627c6e0bc0209e9443989aff954242d2b221ad5`。
- [リリース v0.1.0](https://github.com/Xenoah/tsubuyai-tech/releases/tag/v0.1.0): 2026-10-15 19:48 JST公開済み。draft・prereleaseではなく、配信用ZIP・単体HTML・SHA-256の3点を添付。
- [リリースCI](https://github.com/Xenoah/tsubuyai-tech/actions/runs/38722830110): 成功。
- [Pages CI](https://github.com/Xenoah/tsubuyai-tech/actions/runs/38722829873): build成功、deployのConfigure Pagesで失敗。GitHub APIのhas_pagesはfalse。Web配信は未完了。
- GPTの更新タスク: 毎時00分・Asia/Tokyoで有効化済み。開始予定2026-10-15 20:00 JST。定期タスクの初回完了はまだ未確認。

## Pagesの初回有効化

リポジトリ所有者が **Settings → Pages → Build and deployment → Source → GitHub Actions** を選択する。その後、上記Pages CIの **Re-run failed jobs** を実行すれば、成功済みのbuildの成果物から配信を再開できる。成果物の期限が切れている場合は **Actions → Validate and deploy Pages → Run workflow** で再ビルドする。

接続中のGitHub連携はコード更新・Actionsの結果確認・再実行に対応するが、Pagesの初回有効化の管理操作は提供していない。GitHub公式configure-pagesのenablementオプションはGITHUB_TOKEN以外の管理権限を持つトークンが必要なため、トークンを追加保存して迂回する構成にはしていない。

初回有効化以後は、検証済みニュースのmainへのpushで通常のPages配信が走る。リリースのダウンロード公開はPages有効化に依存しない。

## 更新担当GPTの実行条件

1. 毎回、最新mainのAGENTS.md、EDITORIAL.md、全agents/*.md、docs/UPDATE.mdを読む。`npm run brief -- all` で既存記事・ルールの版を確認。
2. 各キャラの担当分野と許可ドメインから、新しい前向きな一次発表を探す。AIは新モデルの提供開始・公開を優先する。
3. 一次資料の本文、発表日、出来事の日付、根拠・制限を照合。取得不能・未確認・噂は採用しない。同じURLや出来事を重複投稿しない。
4. 短い独自の日本語要約と出典・検証メモだけを保存。本文・写真・図表・OGP・原文のコピーを含めない。否定的なニュースの言い換え掲載は禁止。必要な留意点・訂正は省略しない。
5. 内容が増えなければ0件でよい。時刻だけの更新や空コミットで活動を装わない。訂正・撤回を新規記事より優先する。
6. reviewとハッシュは実際に確認した範囲だけ記録。ルールを変更したり、ハッシュを機械的に書き換えて検証を通したりしない。
7. `npm test` と `npm run build` の成功後、対象差分だけmainへ反映。push直前のHEADが変わっていたら取り込み直して再検証。force pushをしない。
8. Actionsの結果と配信データを確認。更新件数、コミット、検証結果、公開状態を短く報告。失敗時は未完了と明示する。

追加のAPIキー・有料サービス・常駐プロセスを作らない。アクセス不能時に認証情報を探したり、権限・公開ゲートを迂回したりしない。
