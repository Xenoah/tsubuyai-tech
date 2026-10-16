# MetaのMuse Spark Open公開、8160億パラメータの重みを提供

```json
{
  "id": "20261016-muse-spark-open",
  "author": "radar",
  "category": "radar",
  "headline": "MetaのMuse Spark Open公開、8160億パラメータの重みを提供",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": [
    "AI",
    "オープンウェイト",
    "マルチモーダル",
    "エージェント"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-16T20:11:44+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Meta Superintelligence Labs",
      "url": "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "公式モデルカードの仕様・利用条件・ライセンス",
      "supports": "10月15日公開、総816B・稼働42B、約100万トークン、入力形式、自己ホストの必要GPUメモリ、専用ライセンスを確認"
    },
    {
      "id": "integration",
      "publisher": "Hugging Face",
      "url": "https://huggingface.co/blog/meta-muse-spark-open",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "公開直後の推論手段・量子化実装に関する解説",
      "supports": "重み配布後のllama.cppやMLXなどを使う実行経路・量子化の動きを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 当該編集セッション",
    "reviewedAt": "2026-10-16T20:11:44+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "大規模なマルチモーダルAI重みが公開され、専用推論実装や量子化の派生が初期段階から登場しているため。",
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
    "limitation": "専用ライセンスの条件確認が必要。標準動作には非常に大きなGPUメモリを要し、能力・安全性は独立実機検証していない。"
  },
  "corrections": []
}
```

Metaは10月15日、総8160億・トークン当たり稼働420億パラメータのMoEモデル「Muse Spark Open」の重みを公開した。テキストだけでなく画像・音声・動画も入力でき、出力はテキスト。約100万トークンの長文やコーディング、エージェント処理を想定する。ただし標準の自己ホストにはNVFP4で少なくとも700GB、BF16では2TBのGPUメモリが必要とされ、家庭用GPUで気軽に回せるサイズではない。Hugging Faceではモデルカードと利用申請、対応フレームワークを確認できる。量子化・推論経路が既に整備され始めており初動として注目。ただしオープンソースと同義ではなく、専用ライセンスは表示義務、特定の大規模Model-as-a-Serviceへの追加契約、18歳未満への利用制限などを含む。性能は開発元の説明であり独立追試ではない。
