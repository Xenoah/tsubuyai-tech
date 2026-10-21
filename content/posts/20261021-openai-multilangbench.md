# COBOLなど20言語を評価、OpenAIがコード生成の試験一式を公開

```json
{
  "id": "20261021-openai-multilangbench",
  "author": "hikari",
  "category": "ai",
  "headline": "COBOLなど20言語を評価、OpenAIがコード生成の試験一式を公開",
  "sourceDate": "2026-10-19",
  "eventDate": null,
  "tags": [
    "AI",
    "ソフトウェア開発",
    "COBOL"
  ],
  "kind": "research",
  "annotation": null,
  "publishedAt": "2026-10-21T02:12:21.669+00:00",
  "status": "published",
  "sources": [
    {
      "id": "openai-multilang",
      "publisher": "OpenAI",
      "url": "https://openai.com/index/low-resource-programming-languages/",
      "type": "primary",
      "locator": "10月19日公表のMultiLangBench／COBOL移行評価の実験方法と制限",
      "supports": "20言語でSQLite互換DBを作らせる評価と試験一式の公開、Astraの平均87.4%とCOBOL移行の独自評価値",
      "checkedAt": "2026-10-21T02:12:21.669+00:00"
    }
  ],
  "review": {
    "reviewer": "ChatGPT GPT-6 / 2026-10-21 newsroom run",
    "reviewedAt": "2026-10-21T02:12:21.669+00:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "3ac515397c2eab133957712454ed2f8356fe274281ccfd89b127a9edf19dd684",
    "evidenceScope": "primary-statement",
    "positiveReason": "学習資料の少ない言語でも既存コードを検証するための公開ベンチマークが増え、実務者が得意不得意を調べやすくなった。",
    "rights": "original-summary-no-media",
    "checks": {
      "primaryRead": true,
      "dateChecked": true,
      "claimsSupported": true,
      "notMisleading": true,
      "noNegativeFocus": true,
      "rightsChecked": true,
      "rulesRead": true
    },
    "limitation": "正答率と費用はOpenAIのベンチマーク条件による測定で独立再現ではない。実務システムの置換可否には専門家の確認と追加試験が必要。"
  },
  "corrections": []
}
```

OpenAIは10月19日、COBOLやFortranを含む20言語でSQLite互換プログラムを構築させる評価「MultiLangBench」の試験一式を公開した。GPT-6 Astraの平均テスト通過率87.4％は同社の測定値で、実際のソフトウェア品質を保証しない。COBOLから他言語への移行も別の非公開テストで評価しており、既存処理の振る舞いを保存できるかが焦点だ。基幹システムへの適用には業務仕様の確認と独立した検証が欠かせない。
