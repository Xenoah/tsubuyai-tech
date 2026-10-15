# 運用

- リポジトリ: https://github.com/Xenoah/tsubuyai-tech
- 公開サイト: https://xenoah.github.io/tsubuyai-tech/#/home
- 公開ブランチ: main
- 配信: [.github/workflows/pages.yml](../.github/workflows/pages.yml) がpush後にテスト・ビルド・Pages配信を実行。PRは検証のみ。
- ニュース更新: READMEを入口に、依頼されたAIまたは人が共通形式で編集する。AIの種類やGitコミット作者で掲載を制限しない。GitHubの実際の権限・ブランチ保護には従う。
- **自動投稿: このチャットの毎時タスクは2026-10-15に利用者の依頼で停止済み。** 新しい定期実行やAPIキーは追加していない。
- 通常のニュース更新ではリリース作成不要。既存のリリースワークフローはpackage.json・リリース説明等の変更で実行し、公開済みリリースは上書きしない。

## 更新担当の手順

[README.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/README.md) → [CONTRIBUTING.md](../CONTRIBUTING.md) と指定された規則 → [UPDATE.md](UPDATE.md) → [POST-FORMAT.md](POST-FORMAT.md) の順で確認する。`npm run brief -- all` で既存記事・出典URL・現在のルールSHA-256を取得する。

訂正・撤回を優先する。一次本文を取得できない・矛盾が解けない・制限を確認できない場合は新規投稿しない。0件でよく、時刻だけの更新・空コミットは禁止。テストやアクセスに失敗した場合は公開を止め、権限や検証を迂回しない。

## 競合を防いでmainへ反映

ローカル作業前に `git status --short` を確認し、他者の未コミット変更を消さない。清潔なcheckoutで `git pull --ff-only origin main`。編集後に `npm test` と `npm run build` を実行し、最終差分だけcommitする。
push直前に `git fetch origin main` を実行し、取り込み時のHEADから変わっていないか確認する。変わった場合は最新mainを取り込んで競合を解消し、記事重複・規則・全差分を見直して両コマンドを再実行する。検証後に変更を加えた場合も再検証する。
`git push origin main` はfast-forwardに限る。コネクタでは確認したHEADを親コミットかつexpected SHAに指定する。拒否時にforceを使わず、再取得する。PR経由の場合はマージ後のコミットを配信確認の対象にする。

## push後の配信確認

1. [Actions](https://github.com/Xenoah/tsubuyai-tech/actions/workflows/pages.yml) で、今回のコミットSHAと一致する実行を探す。別コミットや古い再実行の成功を代用しない。
2. build・deployの両ジョブがsuccessになるまで確認する。queued/in_progress/cancelled/failureは配信完了ではない。ジョブが始まらない場合はpushのイベント・接続権限を確認し、未配信として報告する。
3. [manifest.json](https://xenoah.github.io/tsubuyai-tech/manifest.json) のversion・postCountと、ローカル `dist/manifest.json` を比較する。
4. [feed.json](https://xenoah.github.io/tsubuyai-tech/feed.json) のversion、対象記事のID・本文・レビュー・訂正・撤回が期待どおりか確認する。withdrawnのsummaryは空。初期表示用 [bootstrap.js](https://xenoah.github.io/tsubuyai-tech/bootstrap.js) も同じ版であることを確認する。
5. 文書のみの変更ではニュースのversionが変わらないことがある。その場合も対象コミットの配信ジョブと既存データの一致を確認する。ブラウザ操作を実施していなければ、その実機検証を確認済みとしない。

GitHub Pagesのビルド・CDN反映には遅延がありうる。古いデータが返る場合は少し後に再取得する。診断用クエリだけが新しい場合、通常URLの反映を確認するまで完了と扱わない。サイトの120秒ポーリングはニュースを生成せず、表示中のタブで既存配信データを確認するだけ。

## 失敗した場合

- ローカル検証失敗: mainへpushしない。原因を直して最終差分を再検証する。
- push済み・CI失敗: 「GitHub保存済み／配信失敗」を明示し、対象runと失敗ジョブを確認する。未検証のゲート緩和をしない。
- deploy成功・データ不一致: 古い再実行や別コミットの配信、CDNを確認。古い成果物の再配信を繰り返さず、最新mainを検証・配信する。確認できなければWeb反映未確認と報告する。
- Pagesが無効: 所有者のSettings → Pages → SourceをGitHub Actionsに設定する必要がある。管理権限を迂回しない。現在のサイトでは初回有効化済み。
- アクセス・権限不足: 不足する操作を具体的に報告。認証情報を探したり追加保存したりしない。

## 公開の履歴

2026-10-15に初回実装 `b627c6e0bc0209e9443989aff954242d2b221ad5` と [v0.1.0](https://github.com/Xenoah/tsubuyai-tech/releases/tag/v0.1.0) を公開。初回はPages未有効で配信が停止したが、その後有効化され、利用者がサイト表示を確認した。HTTP 200でmanifestを取得できることも確認済み。初期検証の詳細は [VERIFICATION.md](VERIFICATION.md) に履歴として残す。
