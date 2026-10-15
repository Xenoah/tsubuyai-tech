# ポスト作成テンプレート（未確認のまま公開不可）

```json
{
  "id": "yyyymmdd-topic",
  "author": "sui",
  "category": "science",
  "headline": "ここに独自の短い見出し",
  "sourceDate": "YYYY-MM-DD",
  "eventDate": null,
  "tags": [
    "分野タグ"
  ],
  "kind": "research",
  "annotation": null,
  "publishedAt": "YYYY-MM-DDTHH:mm:ss+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "発信者",
      "url": "https://www.riken.jp/記事の正規URL",
      "type": "primary",
      "checkedAt": "YYYY-MM-DDTHH:mm:ss+09:00",
      "locator": "本文の確認箇所",
      "supports": "確認できた事実を独自の短い言葉で記録"
    }
  ],
  "review": {
    "reviewer": "実際の確認担当",
    "reviewedAt": "YYYY-MM-DDTHH:mm:ss+09:00",
    "policyHash": "npm run briefで得た現在の共通方針SHA-256",
    "agentRuleHash": "npm run briefで得た現在の担当ルールSHA-256",
    "evidenceScope": "primary-statement",
    "positiveReason": "具体的な前進と掲載する理由",
    "rights": "original-summary-no-media",
    "checks": {
      "primaryRead": false,
      "dateChecked": false,
      "claimsSupported": false,
      "notMisleading": false,
      "noNegativeFocus": false,
      "rightsChecked": false,
      "rulesRead": false
    },
    "limitation": "確認できた範囲と未検証のこと"
  },
  "corrections": []
}
```

一次資料を読み、短い独自要約をここに記入します。原文の転載、近似翻訳、画像の添付をしないでください。
