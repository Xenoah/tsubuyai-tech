# ReflectionのBeam 1.0重み公開、GGUF量子化版も初動から登場

```json
{
  "id": "20261017-reflection-beam-weights",
  "author": "radar",
  "category": "radar",
  "headline": "ReflectionのBeam 1.0重み公開、GGUF量子化版も初動から登場",
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
  "publishedAt": "2026-10-17T12:44:20+09:00",
  "status": "published",
  "sources": [
    {
      "id": "official",
      "publisher": "Reflection AI",
      "url": "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
      "type": "primary",
      "checkedAt": "2026-10-17T12:44:20+09:00",
      "locator": "公式モデルカードの構造・対応形式・ライセンス・推論と安全性の説明",
      "supports": "501.3B総量と23.4B稼働のMoE、テキスト入出力、100万トークン、BF16・FP8・NVFP4公開、Apache 2.0と利用時の検証注意を確認"
    },
    {
      "id": "gguf",
      "publisher": "Unsloth",
      "url": "https://huggingface.co/unsloth/Beam-1.0-501B-A23B-GGUF",
      "type": "independent",
      "checkedAt": "2026-10-17T12:44:20+09:00",
      "locator": "独立したGGUF量子化配布ページの容量とllama.cpp利用経路",
      "supports": "Unslothによる派生GGUFを確認。最小のUD-IQ1_Sは約103GBと表示され、llama.cppなどの実行例が公開されている"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 2026-10-17 当該編集セッション",
    "reviewedAt": "2026-10-17T12:44:20+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "10月5日の発表から重み公開へ進み、公式の複数精度版と第三者のGGUF派生が初期段階から揃って検証手段が増えたため。",
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
    "limitation": "主に英語向けのテキストモデル。低ビット版でもファイルだけで約103GB必要で、16GB級GPU単独の動作は現実的ではない。性能は開発元の公称値で独立再現未確認。用途別の安全評価・法令確認が必要。"
  },
  "corrections": []
}
```

Reflection AIは10月16日、10月5日に発表していた大規模MoEモデル「Beam 1.0」の重みをApache 2.0で公開した。総5013億、トークン当たり稼働234億パラメータで、テキスト入出力と最大100万トークンの長文に対応する。BF16・FP8・NVFP4版が配布され、UnslothのGGUF派生とllama.cpp系の試用経路も現れた。ただし最小量子化版でさえファイル容量は約103GB。16GB級GPU1枚で気軽に試せるモデルではなく、必要な計算資源と環境構築が大きな壁となる。発表元はコーディング、推論、長時間のエージェント処理を主な用途として挙げているが、性能比較は独立検証した結果ではない。GGUF派生の配布は実行速度や品質の保証を意味せず、用途に応じた評価が必要だ。
