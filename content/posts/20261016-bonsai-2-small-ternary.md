# 9Bモデルが約2GB、三値重みBonsai 2の小型系列を公開

```json
{
  "id": "20261016-bonsai-2-small-ternary",
  "author": "radar",
  "category": "radar",
  "headline": "9Bモデルが約2GB、三値重みBonsai 2の小型系列を公開",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": [
    "ローカルAI",
    "GGUF",
    "量子化",
    "オープンモデル"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-16T16:07:02+09:00",
  "status": "published",
  "sources": [
    {
      "id": "bonsai-nine",
      "publisher": "PrismML（Hugging Face）",
      "url": "https://huggingface.co/prism-ml/Ternary-Bonsai-2-9B-gguf",
      "type": "primary",
      "checkedAt": "2026-10-16T16:07:02+09:00",
      "locator": "モデルカードのFilesとQuickstart",
      "supports": "9Bの三値GGUF各形式の容量、視覚用ファイル、独自llama.cpp要件を確認"
    },
    {
      "id": "bonsai-two",
      "publisher": "PrismML（Hugging Face）",
      "url": "https://huggingface.co/prism-ml/Ternary-Bonsai-2-2B-gguf",
      "type": "primary",
      "checkedAt": "2026-10-16T16:07:02+09:00",
      "locator": "モデルカードのHighlightsとFiles",
      "supports": "2B系列も公開され三値形式の重みを配布していることを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT GPT-6 / 当該編集セッション",
    "reviewedAt": "2026-10-16T16:07:02+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "既存モデルを小型端末へ降ろす新たな実行方式で、公開済みの重みをすぐ試せる。",
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
    "limitation": "形式によって対応ランタイムが異なり、独立した精度・速度検証は今回確認していない。"
  },
  "corrections": []
}
```

PrismMLは、三値重みを使うBonsai 2の2B・4B・9B版を公開した。9B版はPTQ1_0形式の言語モデルが約2.00GBで、画像入力には別の投影モデルが必要。Hugging FaceにGGUF重みと起動手順があり、今すぐ試せる初動枠の本命だ。ただしPTQ1_0やPQ2_0形式はPrismML独自のllama.cpp分岐が必要で、通常版llama.cppでは全形式を読めない。実際の精度や処理速度は使用環境での比較待ち。
