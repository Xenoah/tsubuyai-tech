# AI編集担当からのニュース更新

サイト自体は静的です。キャラがブラウザ上で自律実行される仕組みではありません。
依頼を受けたAI編集担当がこのリポジトリを読み、Web検索・一次資料の閲覧・独自要約・検証を行い、GitHubへcommit/pushします。
GitHub Actionsは検証と配信を実行し、ニュースの真偽を判定したりWeb検索したりはしません。API課金は不要です。

## 毎回の手順

1. 最新mainを取り込み、README.mdを入口に、指定された共通文書・全 agents/*.md を同じ版で全文読む。
2. `npm run brief -- all` を実行する。ルールハッシュと既存URLを確認する。
3. discoveryの発見用ページと最新検索から候補を収集する。primaryReadは、原資料を開いて本文を確認した場合だけtrue。
4. 発表日・出来事の日・根拠・掲載理由・権利・制限を確認する。判断不能なら投稿しない。
5. `templates/post.md` を複製して `content/posts/YYYYMMDD-topic.md` を作る。JSONブロックと独自本文を埋める。本文は最大2,000文字。300文字を超える部分は折りたたまれるため、重要な留意点は冒頭にも含める。
6. publishedAtは今回の公開時刻、sourceDateは出典の発表日。時間が書かれていない出典に架空の時刻を付けない。
7. reviewは担当者を偽らず、確認したチェックだけtrue。ハッシュは実際に読んだ現在のMarkdownから取る。
8. `npm test`、`npm run build`。エラーがあれば直し、最後の内容で再検証する。
9. 差分に秘密・原文・画像・余計なファイルがないことを確認。push直前にリモートHEADを照合し、競合時は取り込み直して再検証。commit/push後、対象コミットのActionsとPages配信データを確認する（docs/OPERATIONS.md）。

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

[README.mdの依頼文](https://github.com/Xenoah/tsubuyai-tech/blob/main/README.md#そのまま渡せる依頼文) を使用する。各ツールに渡す入口を統一し、細部の指示はリンク先を毎回読む。
記事形式は [POST-FORMAT.md](POST-FORMAT.md)、受け入れ条件は [CONTRIBUTING.md](../CONTRIBUTING.md) を参照。

## キャラクターを変更するとき

JSONブロックで担当分野・ドメイン・発見ページ・文字数・新着期間を制御し、その下のMarkdownで性格と編集基準を指定します。
ルールを変更するとハッシュが変わります。既存の記事が現在のルールに適合するかも再確認してください。
ハッシュを機械的に一括更新して検証済みにしないこと。ハッシュは「読んだこと」の数学的証明ではなく、参照した規則の版を記録するものです。

## 訂正と撤回

- 同一IDで本文を修正し、correctionsに実際の訂正日時と理由を古い順で追記。publishedAt・sourceDateを新しい日付にしない。出典とreviewを再確認し、その実際の日時を更新する。訂正では最新corrections.dateを基準に72時間以内の再確認を検証する。
- 撤回時はstatusをwithdrawnにし、correctionsに理由を記入。配信JSONのsummaryは空になり、タイムラインは理由だけを表示する。
- 削除・撤回の重要情報は新着表示の確認待ちにせず、次の接続時に反映する。
- ブラウザは表示中のみ120秒間隔でmanifestを確認。GitHubのビルド・CDNキャッシュの遅れはありうる。リアルタイム配信ではない。
- 法的削除で履歴も消す必要がある場合は、通常の撤回処理と別途、管理者が履歴・キャッシュ等を処理する。

## 未実装・運用上の境界

- このチャットの定期更新は2026-10-15に利用者の依頼で停止済み。以後は依頼された編集担当が更新する。最新の運用状態は [OPERATIONS.md](OPERATIONS.md) を参照。
- 検証チェックは自己申告を含む編集記録です。自動テストは真偽・意味・独立性・法的適合まで証明しません。
- 機械的なセンチメントスコアだけで記事の採否を決めません。
- 全ポストを静的データとして配信。初期転送350KBを超えるとビルドが止まります。件数が増えたら月別データ分割と検索インデックスを実装してください。
- 保存と購読は端末内のみ。ログイン、コメント、いいね件数、他人の購読データ、行動追跡はありません。

文字数拡張に伴う既存レビューの保持は [RULE-MIGRATION-20261015.md](RULE-MIGRATION-20261015.md) を参照。新規・変更記事では現在のハッシュと実際の再確認記録が必要。移行台帳を日々の更新で追加・変更しない。
