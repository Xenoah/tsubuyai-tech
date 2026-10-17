# Beamの重みが公開、5010億MoEにGGUF派生も登場

```json
{
  "id": "20261017-reflection-beam-weights",
  "author": "radar",
  "category": "radar",
  "headline": "Beamの重みが公開、5010億MoEにGGUF派生も登場",
  "sourceDate": "2026-10-16",
  "eventDate": "2026-10-16",
  "tags": [
    "AI",
    "オープンウェイト",
    "MoE",
    "エージェント"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-17T09:04:58+09:00",
  "status": "published",
  "sources": [
    {
      "id": "official",
      "publisher": "Reflection AI",
      "url": "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
      "type": "primary",
      "checkedAt": "2026-10-17T09:04:58+09:00",
      "locator": "開発元の公式モデルカードにある規模・精度・モダリティ・評価条件・利用許諾",
      "supports": "総501.3B・稼働23.4BのMoE、100万トークン、テキスト専用、BF16・FP8・NVFP4版、Apache 2.0、性能表が開発元評価であることを確認"
    },
    {
      "id": "gguf",
      "publisher": "Unsloth",
      "url": "https://huggingface.co/unsloth/Beam-1.0-501B-A23B-GGUF",
      "type": "independent",
      "checkedAt": "2026-10-17T09:04:58+09:00",
      "locator": "量子化派生のモデルカード・llama.cpp導入例・公開されているファイル容量一覧",
      "supports": "UnslothがGGUF派生を公開し、llama.cpp向けの呼び出し例と最小量子化版の約103GB表示があることを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 2026-10-17 当該編集セッション",
    "reviewedAt": "2026-10-17T09:04:58+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "予告段階から実際の重み公開へ進み、公式の複数精度版と第三者のGGUF量子化派生が初動からそろい検証入口が広がったため。",
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
    "limitation": "主に英語向けのテキスト専用モデルで、家庭用16GB級GPU単独での自己ホストは現実的ではない。公表ベンチマークは開発元の値で独立実測していない。Apache 2.0でも用途別の安全評価と法令確認が必要。"
  },
  "corrections": []
}
```

Reflection AIは10月16日、コーディング・推論・エージェント向けMoE「Beam 1.0」の重みをApache 2.0で公開した。総約5010億、トークン当たり稼働約230億パラメータ。100万トークンの長文を扱うテキスト専用モデルで、BF16・FP8・NVFP4版が公開されている。ただし大規模な計算資源が必要で、16GB級GPU1枚で気軽に動かせる規模ではない。初動の注目点は、UnslothによるGGUF派生も現れ、llama.cpp系へ試用経路が広がったこと。ただしUnsloth公開の最小量子化版でもファイル容量は約103GBに達する。性能表はReflection側の評価で、独立追試や日本語性能・安全性の保証ではない。まずは公式モデルカードとGGUFの実行条件を確認したい。
