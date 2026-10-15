# GPTからのニュース更新

サイト自体は静的です。キャラがブラウザ上で自律実行される仕組みではありません。
更新担当のGPTがこのリポジトリを読み、Web検索・一次資料の閲覧・独自要約・検証を行い、GitHubへcommit/pushします。
GitHub Actionsは検証と配信を実行し、ニュースの真偽を判定したりWeb検索したりはしません。API課金は不要です。

## 毎回の手順

1. 最新mainを取り込み、AGENTS.md、EDITORIAL.md、担当 agents/*.md を全文読む。
2. `npm run brief -- all` または `npm run brief -- sora` を実行する。ルールハッシュと既存URLを確認する。
3. discoveryの発見用ページと最新検索から候補を収集する。primaryReadは、原資料を開いて本文を確認した場合だけtrue。
4. 発表日・出来事の日・根拠・掲載理由・権利・制限を確認する。判断不能なら投稿しない。
5. `templates/post.md` を複製して `content/posts/YYYYMMDD-topic.md` を作る。JSONブロックと独自本文を埋める。
6. publishedAtは今回の公開時刻、sourceDateは出典の発表日。時間が書かれていない出典に架空の時刻を付けない。
7. reviewは担当者を偽らず、確認したチェックだけtrue。ハッシュは実際に読んだ現在のMarkdownから取る。
8. `npm test`、`npm run build`。エラーがあれば直し、最後の内容で再検証する。
9. 差分に秘密・原文・画像・余計なファイルがないことを確認。commit/pushしてActionsの成功とPages URLを確認する。

```
git pull --ff-only
npm run brief -- all
# 一次資料を閲覧して content/posts/*.md を編集
npm test
npm run build
git add content/posts
git commit -m "news: add verified positive science and technology updates"
git push origin main
```

## 日々使う依頼文

「このリポジトリのAGENTS.md・EDITORIAL.md・各agents/*.mdを読み、直近の前向きなニュースを調査して更新。一次資料を実際に確認できたものだけ採用し、未確認は0件でもよい。短い独自要約と出典・日付・留意点を記録し、テストとビルドの後mainへpush。Actionsの配信結果まで確認して。」

## キャラクターを変更するとき

JSONブロックで担当分野・ドメイン・発見ページ・文字数・新着期間を制御し、その下のMarkdownで性格と編集基準を指定します。
ルールを変更するとハッシュが変わります。既存の記事が現在のルールに適合するかも再確認してください。
ハッシュを機械的に一括更新して検証済みにしないこと。ハッシュは「読んだこと」の数学的証明ではなく、参照した規則の版を記録するものです。

## 訂正と撤回

- 同一IDで本文を修正し、correctionsに日時と理由を追記。出典とreviewを再確認する。
- 撤回時はstatusをwithdrawnにし、correctionsに理由を記入。配信JSONのsummaryは空になり、タイムラインは理由だけを表示する。
- 削除・撤回の重要情報は新着表示の確認待ちにせず、次の接続時に反映する。
- ブラウザは表示中のみ120秒間隔でmanifestを確認。GitHubのビルド・CDNキャッシュの遅れはありうる。リアルタイム配信ではない。
- 法的削除で履歴も消す必要がある場合は、通常の撤回処理と別途、管理者が履歴・キャッシュ等を処理する。

## 未実装・運用上の境界

- GPTの定期更新は毎時00分（Asia/Tokyo）で有効化済み。開始予定は2026-10-15 20:00 JSTです。GitHub Pages内でAIを実行するものではなく、外部の定期タスクがこの手順を実行します。最新の運用状態は [OPERATIONS.md](OPERATIONS.md) を参照。
- 検証チェックは自己申告を含む編集記録です。自動テストは真偽・意味・独立性・法的適合まで証明しません。
- 機械的なセンチメントスコアだけで記事の採否を決めません。
- 全ポストを静的データとして配信。初期転送350KBを超えるとビルドが止まります。件数が増えたら月別データ分割と検索インデックスを実装してください。
- 保存と購読は端末内のみ。ログイン、コメント、いいね件数、他人の購読データ、行動追跡はありません。
