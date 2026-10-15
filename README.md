# つぶやいテック

**世界の、いい変化を。**

5人の架空の編集キャラクターが、前向きな科学技術ニュースを届ける静的サイト。
GitHub内のMarkdownを読んだGPTがニュースを編集してpushし、GitHub ActionsからGitHub Pagesへ公開します。

リポジトリ: https://github.com/Xenoah/tsubuyai-tech

初回リリース [v0.1.0](https://github.com/Xenoah/tsubuyai-tech/releases/tag/v0.1.0) を公開済み。配信用ZIP・単体プレビュー・SHA-256を添付しています。

**運用状態（2026-10-15）:** GitHubへのpush・リリース公開・毎時のGPT更新タスク設定は完了。Pagesは初回有効化待ちのためWeb未配信です。所有者が **Settings → Pages → Build and deployment → Source → GitHub Actions** を選択後、失敗した配信ジョブを再実行してください。詳細は [docs/OPERATIONS.md](docs/OPERATIONS.md)。

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

## すぐに見る

同梱の `dist/preview.html` は単一ファイルの閲覧用プレビューです。直接ブラウザで開けます。
ルールのダウンロードリンク等は配信版向けです。プレビュー内の新着チェック・共有は無効です。

Node.js 22以降で:

```sh
npm test
npm run build
npm run preview
```

ローカル確認: http://127.0.0.1:4173/

## GitHub Pagesへ公開

1. 新しいGitHubリポジトリを作成し、このフォルダの内容をmainへpushする。
2. `site.config.json` のrepositoryを、実際の `https://github.com/所有者/リポジトリ` に設定する。
3. GitHubの **Settings → Pages → Build and deployment → Source → GitHub Actions** を選択する。
4. **Actions → Validate and deploy Pages → Run workflow**。以後mainへのpushで検証・配信される。
5. Actionsの成功と表示されたPages URLを確認する。プロジェクト配下のURLにも対応する相対パス・hash routingを使用。

新規リポジトリとPages設定は、このZIPに含まれるだけでは作成されません。
設定値が空の状態ではGitHubリンク・Issue窓口のURLを推測表示しません。

## 5人の編集部

| 名前 | 担当 | ルール |
| --- | --- | --- |
| ヒカリ | AI・計算 | agents/hikari.md |
| リク | ロボット・ものづくり | agents/riku.md |
| デン | 電子・半導体 | agents/den.md |
| ソラ | 宇宙・探査 | agents/sora.md |
| スイ | 基礎科学 | agents/sui.md |

架空なのはキャラクターです。ニュースを創作することは禁止します。
初期データは2026-10-13に本文を確認した7件の公式発表。すべて「発表元の説明を確認」の範囲です。

## 更新フロー

`AGENTS.md` → `EDITORIAL.md` → `agents/*.md` → 一次資料確認 → `content/posts/*.md` → テスト・ビルド → push → Pages

詳しい更新手順・依頼文: [docs/UPDATE.md](docs/UPDATE.md)

GitHub Pages内でGPTが常時動くわけではありません。更新を依頼されたGPTが外側から実行する方式です。
GPTの更新タスクを毎時00分（日本時間）で設定済み。開始予定は2026-10-15 20:00 JSTです。各回は最新のMarkdown規則を読み、確認できた記事がある場合だけ検証後にpushします。スケジュール設定と実行成功は別に扱います。

## 品質と権利

公開ゲートは出典・ドメイン・日付・文字数・担当分野・確認記録・規則の版を検査します。未確認の記事を自動で事実認定しません。
元記事本文や報道写真は保持せず、短い独自要約と出典等を保存します。著作権への適合は文字数だけで決まりません。
X・Misskeyのロゴ・キャラクター・画像・ソースコードを組み込まず、HTML/CSS/JavaScriptで独自に実装したUIです。画面構成の参考範囲は [docs/UI-DESIGN.md](docs/UI-DESIGN.md) に記録しています。特許の非侵害保証・網羅的FTO調査は行っていません。
[docs/IP-REVIEW.md](docs/IP-REVIEW.md) に確認した原則、実装構成、未確認範囲を記録しています。

## データ構成

```text
agents/          キャラ別Markdown（設定JSONと編集ルール）
content/posts/   ポストMarkdown（出典・確認記録と独自要約）
src/             HTML / CSS / Vanilla JavaScript / SVG
scripts/         依存なしの検証・ビルド・編集brief
tests/           公開ゲート、並べ替え、検索、期限、エスケープ
docs/            更新手順、権利確認記録、検証記録
dist/            生成されたGitHub Pages配信物（gitignore）
```

## ライセンス

公開配布のライセンスは所有者が決定するまで未指定です。参照したニュース・出典サイトの著作物の権利は各権利者に帰属します。
