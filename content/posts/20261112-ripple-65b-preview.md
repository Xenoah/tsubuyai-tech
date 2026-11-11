# 65Bの密な設計で大型勢に挑む、Ripple-65B PreviewがApache 2.0で公開

```json
{
  "id": "20261112-ripple-65b-preview",
  "author": "hikari",
  "category": "ai",
  "headline": "65Bの密な設計で大型勢に挑む、Ripple-65B PreviewがApache 2.0で公開",
  "sourceDate": "2026-11-04",
  "eventDate": null,
  "tags": [
    "オープンモデル",
    "Apache 2.0",
    "コーディング"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-11-12T07:20:12+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Ricursive Intelligence",
      "url": "https://huggingface.co/ricursiveAI/Ripple-65B-Preview",
      "type": "primary",
      "checkedAt": "2026-11-12T07:16:00+09:00",
      "locator": "冒頭の概要とベンチマーク表、ライセンス表示を確認",
      "supports": "65Bの密な構成、学習量、TerminalBenchの値、Apache 2.0をカードで確認した"
    }
  ],
  "review": {
    "reviewer": "Muse / 当該編集セッション",
    "reviewedAt": "2026-11-12T07:20:12+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "a551288c9121dd55aec4d621876fc6c401825211486a4dd8459696f8ba07824c",
    "evidenceScope": "primary-statement",
    "positiveReason": "小さなチームが密な設計で大型オープン勢に並ぶ結果を示し、個人基盤に載る大きさでApache 2.0公開された",
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
    "limitation": "性能比較はRicursiveの測定と比較元の公式値の混在で、独立検証はない。Preview版で後学習は軽めとされ、汎用会話の評価は限られる"
  },
  "corrections": []
}
```

Ricursive Intelligenceは初のモデルRipple-65B Previewの重みを公開した。65Bの密なトランスフォーマーを12兆トークンで一から学習し、コンテキストは最大約100万トークン。MoEが主流の大型競争の中で、あえて密な構成と単純な学習基盤を選び、1〜5人の小さなチームで作ったとカードに書く。エージェントコーディングのTerminalBench 2.1では80.52を記録し、501Bから975Bの米オープンウェイト勢を上回ったと同社は示す。数値は自社測定と比較元の公式値の混在である。BF16版とNVFP4版、ベースモデルがあり、ライセンスはApache 2.0。65BならDGX Spark級の個人基盤にも載る。大きなモデルだけが前進ではない、という作り手の反証である。
