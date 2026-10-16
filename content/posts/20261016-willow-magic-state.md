# Willow実機で魔法状態を精製、Googleが誤り40分の1を報告

```json
{
  "id": "20261016-willow-magic-state",
  "author": "radar",
  "category": "radar",
  "headline": "Willow実機で魔法状態を精製、Googleが誤り40分の1を報告",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": [
    "量子計算",
    "誤り訂正",
    "Google",
    "基礎技術"
  ],
  "kind": "research",
  "annotation": null,
  "publishedAt": "2026-10-16T16:07:02+09:00",
  "status": "published",
  "sources": [
    {
      "id": "google-quantum",
      "publisher": "Google Quantum AI",
      "url": "https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing/",
      "type": "primary",
      "checkedAt": "2026-10-16T16:07:02+09:00",
      "locator": "発表本文の実験結果と今後の課題",
      "supports": "Willow上の状態精製と40倍の誤り削減、実用規模の未実証を確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT GPT-6 / 当該編集セッション",
    "reviewedAt": "2026-10-16T16:07:02+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "量子誤り訂正で消費する特殊な量子状態を、理論から実機での処理へ進めた。",
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
    "limitation": "性能数値はGoogle自身の測定で、拡張可能性と外部再現性は未確立。量子計算全体の忠実度を示す値ではない。"
  },
  "corrections": []
}
```

Google Quantum AIは、量子チップWillow上で「magic state cultivation」を実行し、誤りの多い量子状態を検査して高品質な状態だけ残す手法を実演したと報告した。未処理状態と比べ誤りは約40分の1、T状態の論理忠実度は99.99%という開発元の測定値。ただしこれは量子計算全体の成功率ではない。実用規模への拡大は未達で、今は実機の設計思想を読む案件だ。
