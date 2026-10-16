# 接続ツール経由のPages配信照合

READMEと共通規則、docs/CONNECTOR-RECOVERY.mdに加えて読む補足です。通常の記事更新で本ワークフローや検証条件を変更しません。

閲覧ツールからPagesのJSONやJavaScriptを取得できない場合も、デプロイ成功だけを配信内容確認済みとは扱いません。`pages-verify.yml` が成功したmainのPages配信を受け、配信元と同じSHAをcheckoutして再ビルドし、公開サイトの通常URLにあるmanifest.json、feed.json、bootstrap.jsをGETして、3ファイルすべてをバイト単位で比較します。リダイレクト・別ホスト・診断用クエリへ切り替えて成功扱いにしません。

## 確認方法

1. 先に、マージSHAに一致するpages.ymlのbuild/deploy成功を確認する。
2. `actions/workflows/pages-verify.yml/runs?event=workflow_run` から対応する実行を探す。自動実行のhead_shaは起動時のdefault branchを示す場合があるため、その値だけを配信対象SHAの証明にしない。
3. `Record verification target` のログで `Verified commit` がマージSHA、`Pages run` が手順1のrun IDであることを確認する。
4. `Build expected publication` と `Compare public Pages with the exact build` の両stepがsuccessで、ログのversion・postCountが対象ビルドと一致していることを確認する。ログには各ファイルのSHA-256も残る。
5. queued/in_progress/skipped/failure/cancelled、取得不能、内容不一致は配信照合成功ではない。既にマージ済みなら「保存・デプロイ済み／配信照合未完了」と正確に報告し、追加のニュースマージは行わない。次回は最新mainと該当配信を再確認する。

検証はcontents: readのみで行い、サイトへの書き込み・配信・PR作成・マージは行いません。追加キー・依存関係・外部画像は不要です。HTMLやJavaScriptを実行せず、公開データの同一性を確認します。ブラウザ実機での操作確認とは別です。

CDN反映待ちのため最大6回、失敗した回の間は10秒間隔で再取得します。各応答は15秒・1 MiBを上限とし、最後まで不一致なら失敗します。記事の正確性や権利判断をこの照合で代行しません。

`maintenance/pages-verify/` はこの配信照合機能の保守試験専用です。このブランチへのpushでは自分自身のSHAと現在の公開内容を比較するため、公開データを変更しない保守差分に限ります。通常ニュースはnews/ブランチでpreflight → PR CI → 安全なマージ → mainのbuild/deploy → この配信照合の順に進めます。main上での明示的なworkflow_dispatchも読み取り専用です。
