# MetaのMuse Spark Open公開、8160億パラメータの重みを提供

```json
{
  "id": "20261016-muse-spark-open",
  "author": "radar",
  "category": "radar",
  "headline": "MetaのMuse Spark Open公開、8160億パラメータの重みを提供",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": ["AI", "オープンウェイト", "マルチモーダル", "エージェント"],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-17T08:51:15+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Meta Superintelligence Labs",
      "url": "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B-NVFP4",
      "type": "primary",
      "checkedAt": "2026-10-17T08:51:15+09:00",
      "locator": "公式モデルカードの概要・実行条件・ライセンス・モデル派生一覧",
      "supports": "10月15日公開、総816B・稼働42B、100万トークン、入力形式、NVFP4とBF16の必要VRAM、対応実装と量子化派生、専用利用条件を確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 2026-10-17 出典再確認",
    "reviewedAt": "2026-10-17T08:51:15+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "大規模なマルチモーダル重みの公開に加え、対応する推論実装と量子化派生を確認でき、自己ホスト技術の初動を追えるため。",
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
    "limitation": "必要VRAMと能力は開発元の説明で実機検証なし。重み取得・利用には専用ライセンスと用途別の安全対策が必要。重み公開を無条件の利用許諾と解釈しない。"
  },
  "corrections": []
}
```

Metaは10月15日、総8160億・トークン当たり稼働420億パラメータのMoEモデル「Muse Spark Open」の重みを公開した。ただし専用ライセンスがあり、標準の自己ホストには開発元説明でNVFP4でも700GB以上、BF16では2TBのGPUメモリが必要。家庭用GPUで気軽に動かせる規模ではない。画像・音声・動画・テキストを入力し、テキストを出力する100万トークン対応モデルだ。Hugging Faceの公式カードにはvLLM、SGLang、llama.cppなどの実行経路が示され、量子化の派生も確認できる。注目点は大型モデルの重みと推論手段を組み合わせて検証できること。性能は独立追試していない。利用には表示義務や一定規模のModel-as-a-Service事業に関する追加契約などの条件があり、18歳未満向けの利用も想定されていない。用途別の安全評価は別途必要だ。
