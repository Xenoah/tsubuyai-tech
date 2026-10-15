# 公開ポストの形式

[README.md](https://github.com/Xenoah/tsubuyai-tech/blob/main/README.md) が入口。[templates/post.md](../templates/post.md) を複製して `content/posts/YYYYMMDD-topic.md` に保存する。記事IDとファイル名（拡張子を除く）を揃える。UTF-8・BOMなし・LF。先頭は `# 独自見出し`、次に1つのjsonコードブロック、最後に独自要約のプレーンテキスト。YAML front matter・JSON単独ファイル・原文添付は不可。

以下は [scripts/content.mjs](../scripts/content.mjs) の公開ゲートに対応する。文字数はUnicodeコードポイントで数える。見出し行も元記事から転載せず、JSONのheadlineと揃える。未知のフィールドは追加しない。

## 記事のトップレベル

| 項目 | 必須の形式・意味 |
| --- | --- |
| id | 小文字英数字とハイフン。例の形式は `yyyymmdd-topic`。既存IDと重複不可 |
| author / category | hikari / ai、riku / robotics、den / electronics、sora / space、sui / scienceの組み合わせ |
| headline | 独自見出し8〜72文字 |
| publishedAt | このサイトでの初回掲載日時。タイムゾーン付きISO 8601。訂正時も維持 |
| sourceDate | 一次発表の発表日 `YYYY-MM-DD`。初回掲載時に担当のmaxAgeDays以内を確認。古い記事を新着として登録しない |
| eventDate | 出来事の日 `YYYY-MM-DD`。不明・該当なしはnull。発表日と混同しない |
| tags | 1〜5件、各1〜24文字の文字列 |
| status | published または withdrawn。draft/pendingをcontent/postsに置かない |
| kind | announcement または research |
| sources | 下記の出典オブジェクト1〜4件、一次資料を1件以上 |
| review | 下記の確認記録 |
| corrections | 初回は空配列。訂正・撤回時に `{ "date": "実際の日時", "note": "独自の理由" }` を追記。noteは5〜200文字 |
| annotation | null または3〜100文字の編集メモ |

JSONの後の本文は30〜担当のmaxSummaryChars文字（現在240）。HTML、画像、URL、コードブロック、見出しを入れない。独自の短い日本語要約とし、研究段階・対象・重要な制限を落とさない。

## sourcesの各要素

| 項目 | 形式 |
| --- | --- |
| id | 記事内で一意の小文字英数字・ハイフン |
| publisher | 発表元、2〜100文字 |
| url | 担当allowedDomains内の記事単位のHTTPS正規URL。認証情報・ポート・クエリ・フラグメントなし。サイトトップのみは不可 |
| type | primary または independent |
| checkedAt | 本文を実際に確認したタイムゾーン付き日時 |
| locator | 確認箇所を独自の言葉で2〜100文字 |
| supports | その箇所が支える事実を独自の言葉で2〜220文字。原文転載不可 |

許可ドメインでも一次資料の真正性・本文・利用条件は個別に確認する。同じ一次URL・出来事は統合し、出典数を増やすための重複を入れない。

## review

| 項目 | 形式 |
| --- | --- |
| reviewer | 実際の確認担当、2〜80文字。ツール名や当該編集セッションを正直に記録 |
| reviewedAt | 出典確認後にレビューを終えた実際のタイムゾーン付き日時 |
| policyHash / agentRuleHash | 実際に読んだEDITORIAL.mdと担当agents/*.mdのSHA-256。npm run brief -- allで取得 |
| evidenceScope | 通常primary-statement。independently-corroboratedは実際の独立資料が必要で、ゲート上もindependent出典と異なる2ホスト以上が必要 |
| positiveReason | 具体的な前進と掲載理由、10〜200文字 |
| rights | original-summary-no-media |
| checks | 以下の7キーをすべて持つオブジェクト。実施済みの場合だけtrue |
| limitation | 未検証の範囲・条件・重要な制限、10〜220文字 |

checks: `primaryRead`, `dateChecked`, `claimsSupported`, `notMisleading`, `noNegativeFocus`, `rightsChecked`, `rulesRead`。1つでも未完了なら公開しない。テンプレートのfalseを機械的にtrueへ置換しない。

## 日時と後日の訂正

日時には秒とタイムゾーンを含める。例の形式: `YYYY-MM-DDTHH:mm:ssZ` または `YYYY-MM-DDTHH:mm:ss+09:00`。日付だけの出典に時刻を捏造しない。ゲートの5分の時計差許容を予定投稿のために使わない。

初回の確認基準はpublishedAt。訂正・撤回では最新のcorrections.date。出典のcheckedAtとreviewedAtはこの基準より72時間以内に実施したものとし、reviewedAtはすべてのcheckedAt以降。出典確認はsourceDate以降。訂正履歴は初回掲載以降の実際の時刻で古い順に追記し、未来日時は不可。

後日訂正する場合もpublishedAt・sourceDate・IDは維持する。correctionsの理由・実際の日時と、再確認した出典・reviewを更新する。古い記事の再確認だけで新着へ戻さない。撤回時はstatusをwithdrawnにして理由を追記する。配信データのsummaryは空になり、理由を表示する。Git履歴の削除が必要な場合は管理者対応となる。

現在のスキーマ外の情報が必要なら、適当な新キーを追加せず、別の仕様変更として扱う。モデルごとの専用フィールドや外部APIは必要ない。
