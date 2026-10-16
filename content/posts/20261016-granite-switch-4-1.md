# IBM Granite Switch 4.1、対話・判定・音声認識を1系統へ

```json
{
  "id": "20261016-granite-switch-4-1",
  "author": "radar",
  "category": "radar",
  "headline": "IBM Granite Switch 4.1、対話・判定・音声認識を1系統へ",
  "sourceDate": "2026-10-15",
  "eventDate": "2026-10-14",
  "tags": ["AI", "Decision Model", "aLoRA", "音声認識"],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-17T08:51:15+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "IBM Granite",
      "url": "https://huggingface.co/blog/ibm-granite/granite-switch-4-1",
      "type": "primary",
      "checkedAt": "2026-10-17T08:51:15+09:00",
      "locator": "10月15日の開発元記事のモデル構成・KVキャッシュ・実装とデモ",
      "supports": "8Bと30Bの基盤、DecisionとGuardianの切替、基盤モデルのKVキャッシュ再利用、公開コードとデモ、比較値がIBM自身の測定であることを確認"
    },
    {
      "id": "model-card",
      "publisher": "IBM Granite",
      "url": "https://huggingface.co/ibm-granite/granite-switch-4.1-8b",
      "type": "primary",
      "checkedAt": "2026-10-17T08:51:15+09:00",
      "locator": "公式8Bカードの公開日・各構成要素・音声入力・制約とライセンス",
      "supports": "10月14日公開、Apache-2.0、8Bは基盤部分、2種のaLoRAと別途470Mの英語音声認識器を含み、音声とLLMは共同学習されていないことを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 2026-10-17 出典再確認",
    "reviewedAt": "2026-10-17T08:51:15+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "Decision Modelを対話・安全判定・音声入力と統合する公開実装で、重み・構成コード・デモから切替方式を試せるため。",
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
    "limitation": "8B・30Bは基盤部分の規模で、追加のアダプターや音声認識器を含む総数ではない。音声認識は英語のみで誤りが後段へ伝わり得る。性能と安全性は独立検証していない。"
  },
  "corrections": []
}
```

IBMは10月15日、前日公開の「Granite Switch 4.1」を紹介した。8B／30Bは基盤モデルの規模で、そこに判定用と安全判定用のaLoRA、別途470Mの音声認識器を組み込む。音声認識は英語のみで、誤転記が後続の回答・判定へ伝わる可能性がある。肝は対話と専門判定を同じエンドポイントで切り替え、基盤モデルのKVキャッシュを再利用できる設計。音声とLLMを一体学習したモデルとは異なる。Hugging FaceでApache-2.0の重み、構成コード、音声から判定へ進むデモを確認できる。Jevなどと同じDecision Modelの系譜を、既存の対話基盤へ組み込む実装として注目したい。速度・精度の比較はIBM自身の測定であり、第三者による再現結果ではない。安全判定アダプターも、利用先での安全性を保証するものではない。
