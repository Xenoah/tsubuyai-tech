# IBM Granite Switch 4.1、対話・判定・音声認識を1系統へ

```json
{
  "id": "20261016-granite-switch-4-1",
  "author": "radar",
  "category": "radar",
  "headline": "IBM Granite Switch 4.1、対話・判定・音声認識を1系統へ",
  "sourceDate": "2026-10-15",
  "eventDate": "2026-10-14",
  "tags": [
    "AI",
    "Decision Model",
    "aLoRA",
    "音声認識"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-16T20:11:44+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "IBM Granite",
      "url": "https://huggingface.co/blog/ibm-granite/granite-switch-4-1",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "10月15日の開発元記事の構成・実演・試験条件",
      "supports": "8Bと30B、Decision/Guardianアダプター、音声認識を単一エンドポイントにまとめ、デモ・コードと比較の発表元がIBMであることを確認"
    },
    {
      "id": "integration",
      "publisher": "IBM Granite",
      "url": "https://huggingface.co/ibm-granite/granite-switch-4.1-8b",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "公式8BモデルカードのRelease Date・ライセンス・構成と制約",
      "supports": "10月14日公開、Apache-2.0、8B基盤、2種のaLoRA、英語専用音声認識器、試用方法と制約を確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 当該編集セッション",
    "reviewedAt": "2026-10-16T20:11:44+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "Jevに続くDecision Modelの具体的な実装として、公開重み・合成コード・試用デモが揃い、専門アダプター切替を直接確認できるため。",
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
    "limitation": "比較性能はIBMによる測定で独立検証なし。英語音声認識の誤りが後段へ伝わる可能性があり、タスクごとの実測が必要。"
  },
  "corrections": []
}
```

IBMは10月15日、10月14日公開の「Granite Switch 4.1」を紹介。8B／30Bの基盤モデルに、一般的な選択判定用と安全判定用のActivated LoRA（aLoRA）を組み込み、音声認識器も同じエンドポイントから呼び出せる。応答のたびに専門モデルへ切り替えつつ、既存のKVキャッシュを再利用できる設計が肝だ。Decision ModelのJevとの速度や判定精度の比較はIBM自身によるもので、第三者による再現結果ではない。Hugging FaceでApache-2.0のモデル重み、構成手順、音声から判定までのデモを公開中。なお組み込み音声認識は英語のみで、誤転記が後続の判定へ影響し得る。モデルの使い分けを単一の実行基盤へ収める方向性は、AIエージェントの実装を試す価値がある。
