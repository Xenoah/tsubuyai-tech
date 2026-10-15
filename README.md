# つぶやいテック

**世界の、いい変化を。**

5人の架空の編集キャラクターが、前向きな科学技術ニュースを届ける静的サイト。
ChatGPT、Codex、Claude、Claude Code、GitHub Copilotなどが共通のMarkdown形式で編集し、権限のある接続からGitHubへ反映できます。mainへのpush後、GitHub Actionsが検証・ビルドしてGitHub Pagesへ公開します。

- 公開サイト: https://xenoah.github.io/tsubuyai-tech/#/home
- リポジトリ: https://github.com/Xenoah/tsubuyai-tech
- **運用状態（2026-10-15）:** Pages公開済み。このチャットの毎時自動投稿は利用者の依頼で停止済み。以後は依頼された編集担当が更新します。サイト内でAIは実行しません。

## AI編集担当はここから読む

入口は大文字の **README.md** です。最初に最新mainのコミットSHAを確認し、その同じ版の以下の文書を全文読んでください。記憶・古いコピー・READMEだけで記事を編集しないでください。
Webから読む場合、下記URLの `/blob/main/` を `/blob/<確認したSHA>/` に置き換えると版を固定できます。Raw形式は `https://raw.githubusercontent.com/Xenoah/tsubuyai-tech/<SHA>/<ファイルパス>` です。リンクを読めない場合、読了を装わず作業を止めて不足を報告してください。

| 順番 | 文書・アドレス | 内容 |
| --- | --- | --- |
| 1 | [AGENTS.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/AGENTS.md) | 全AI共通の作業規則 |
| 2 | [CONTRIBUTING.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/CONTRIBUTING.md) | 受け入れ条件・権限・変更範囲 |
| 3 | [EDITORIAL.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/EDITORIAL.md) | 真偽確認・前向きな話題・権利・訂正 |
| 4 | [docs/UPDATE.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/docs/UPDATE.md) | 調査から編集、検証、pushまで |
| 5 | [docs/OPERATIONS.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/docs/OPERATIONS.md) | 配信確認・競合・失敗時の扱い |
| 6 | [docs/POST-FORMAT.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/docs/POST-FORMAT.md) | 記事スキーマ・日時・レビュー項目 |
| 7 | [templates/post.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/templates/post.md) | 新規記事の実際の雛形 |

続けて全キャラクターの規則を読み、`npm run brief -- all` でSHA-256・既存記事・出典URLを取得します。担当・許可ドメイン・新着期間・文字数は各Markdownが正本です。

| キャラクター | author / category | 担当ルールのアドレス |
| --- | --- | --- |
| ヒカリ | `hikari` / `ai` | [agents/hikari.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/agents/hikari.md) |
| リク | `riku` / `robotics` | [agents/riku.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/agents/riku.md) |
| デン | `den` / `electronics` | [agents/den.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/agents/den.md) |
| ソラ | `sora` / `space` | [agents/sora.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/agents/sora.md) |
| スイ | `sui` / `science` | [agents/sui.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/agents/sui.md) |

補助資料: [scripts/content.mjs](https://github.com/Xenoah/tsubuyai-tech/blob/main/scripts/content.mjs)（実際の公開ゲート）、[.github/workflows/pages.yml](https://github.com/Xenoah/tsubuyai-tech/blob/main/.github/workflows/pages.yml)（CIと配信）、[docs/IP-REVIEW.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/docs/IP-REVIEW.md)（権利の確認範囲）、[docs/VERIFICATION.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/docs/VERIFICATION.md)（検証記録）。

## 各ツールの入口

| 編集環境 | 読み込みの入口 |
| --- | --- |
| ChatGPT / Claudeなどのチャット | 下の依頼文でREADMEのURLを渡す。Web閲覧・GitHub接続・コマンド実行の可否は環境による |
| Codex / AGENTS.md対応エージェント | [AGENTS.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/AGENTS.md) からREADMEと共通文書へ進む |
| Claude Code | [CLAUDE.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/CLAUDE.md) がAGENTS.mdを参照する |
| GitHub Copilot | [.github/copilot-instructions.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/.github/copilot-instructions.md) から同じ共通文書へ進む |

特定のモデルやベンダーだけを受け付ける仕組みではありません。`author` はサイトの架空キャラクター、`review.reviewer` は実際に確認した編集担当です。両者を混同しないでください。各ツールの指示読み込み機能やGitHub権限がなくても、この文書から手動で参照できます。

## そのまま渡せる依頼文

```text
https://github.com/Xenoah/tsubuyai-tech/blob/main/README.md を最初に読み、
READMEのリンク先にある共通規則・全キャラ規則・記事形式・更新手順・運用手順を
最新mainの同じ版で全文確認してください。npm run brief -- allを実行して、
既存記事の訂正・撤回を優先し、検証できた前向きな一次発表だけを更新してください。
確認担当には実際のツール名を記録し、未確認なら0件で構いません。
通常の記事更新はmainへのpushまで依頼します。npm testとnpm run buildが両方成功した
最終差分だけ反映し、競合時は最新mainを取り込んで再検証してください。
権限・閲覧・検証が不足する場合は公開せず、不足を報告してください。
push後は対象コミットのActionsとPages配信データを確認し、実際の結果を短く報告してください。
```

この依頼文や指示ファイルはGitHubの書き込み権限を付与しません。所有者が許可した接続・ブランチ保護に従います。通常のニュース更新でUI・設定・ワークフロー・ライセンスを変更せず、追加のAPIキーや定期実行を作成しません。

## ローカル検証

Node.js 22以降、外部npm依存なし。テキストはUTF-8（BOMなし）・LFで保存します。

```sh
npm run brief -- all
npm test
npm run build
npm run preview
```

ローカル確認: http://127.0.0.1:4173/
`dist/preview.html` は単一ファイルの閲覧用プレビューです。`dist/` は生成物なのでcommitしません。最新mainへのpushでPages用の成果物をCIが生成します。通常のニュース更新にGitHub Releaseは不要です。

## 実装済み

- 発表日を基準にしたニュースタイムライン、分野フィルタ、文字検索
- キャラ別プロフィール・全投稿・並べ替え（新旧、更新日、出典件数）
- ブラウザ内の保存・購読、30日経過後のアーカイブ
- 一次資料リンク、確認箇所、確認担当、留意点、訂正・撤回履歴
- 新着検知（120秒、可視タブのみ）、読み込み通知、訂正・撤回の優先反映
- オリジナルSVG・CSSアニメーション、画面外停止、端末の低モーション設定、停止ボタン
- Misskeyの画面構成を参考に独自実装した3列UI、丸いパネル、スマホの下部ナビ
- ライト／ダーク／端末連動テーマ、表示設定、キーボード操作、検索ショートカット `/`
- 編集者・日付・掲載状況・ニュースのタグをまとめた軽量ウィジェット
- Markdown規則・SHA-256記録・公開ゲート・Node標準テスト・Pagesワークフロー
- 実行時・ビルド時ともに外部npm依存0、CDN/外部フォント/外部画像/APIキー不要

## 品質と権利

架空なのはキャラクターです。ニュースを創作することは禁止します。一次資料本文を開いて確認し、短い独自の日本語要約・出典・実際の確認記録だけを保持します。
公開ゲートは形式・必須項目・許可ドメイン・日時・規則の版を検査します。真偽・独立性・法的適合を自動認定しません。
特許の非侵害保証・網羅的FTO調査は未実施です。確認範囲は上記IP-REVIEW.mdを参照してください。

## ライセンス

公開配布のライセンスは所有者が決定するまで未指定です。参照したニュース・出典サイトの著作物の権利は各権利者に帰属します。
