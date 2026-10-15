# AI編集担当の共通作業規則

目的: GitHub Pages上の「つぶやいテック」を、検証可能な前向きな科学技術ニュースで更新する。

- 最初に README.md を読む。リンク先の CONTRIBUTING.md、EDITORIAL.md、全 agents/*.md、docs/UPDATE.md、docs/OPERATIONS.md、docs/POST-FORMAT.md、templates/post.md を同じ最新mainの版で全文読む。
- npm run brief -- all で現在の編集指示・SHA-256・既存記事一覧を取得する。
- ブラウザ上ではAIを実行しない。依頼を受けたAI編集担当が検索・一次資料の確認・独自要約・Gitへのpushを担当する。
- サイト利用者にGitHub token/API keyを入力させない。機密・原文・画像・認証情報をリポジトリに保存しない。
- 架空のニュース・引用・時刻・出典を作らない。検索スニペットだけで採用しない。
- draft、pendingなど未確認のファイルをcontent/postsに追加しない。ローカルのtmpはgitignore対象。
- 事実と発表元の主張を区別。検証の範囲をmetadataに明示する。
- 不明なJSONフィールド、ルール不一致、未来日、担当外分野、出典欠落はbuildで停止する。
- 内容変更後、npm test と npm run build。distは生成物としてPages Actionsから配信。
- コード変更では差分に関係するセキュリティ・フィルタ・並べ替え・ビルドテストを実行。
- mainへのpush時はfast-forwardを守る。競合時にforce pushしない。検証後に変わった差分は再検証する。
- depsは原則不要。UIは独自デザイン。第三者のソースコード・アイコン・ブランドをコピーしない。
- 著作権・特許・商標・意匠の非侵害を断定しない。docs/IP-REVIEW.mdの未確認事項を維持する。
- 不要なサブエージェント・常駐AI・課金サービスは作らない。

ChatGPT、Codex、Claude、Claude Code、GitHub Copilotなど、同じ公開ゲートを使用する。review.reviewerに実際の確認担当を記録する。このチャットの自動投稿は停止済み。明示的な依頼なしに定期実行を作成・再開しない。
