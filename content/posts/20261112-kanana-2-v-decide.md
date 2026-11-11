# 生成しないLLM、確率だけ返すKanana-2-v-decideが重み公開

```json
{
  "id": "20261112-kanana-2-v-decide",
  "author": "radar",
  "category": "radar",
  "headline": "生成しないLLM、確率だけ返すKanana-2-v-decideが重み公開",
  "sourceDate": "2026-11-06",
  "eventDate": null,
  "tags": [
    "意思決定",
    "オープンウェイト",
    "Kakao"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-11-12T06:59:01+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Kakao",
      "url": "https://huggingface.co/kakaocorp/kanana-2-v-decide-3b-2611",
      "type": "primary",
      "checkedAt": "2026-11-12T06:57:43+09:00",
      "locator": "NewsとIntroduction、Licenseの節を確認",
      "supports": "2026年11月6日の重み公開、生成しない意思決定の仕組み、対応言語とライセンスをカードで確認した"
    }
  ],
  "review": {
    "reviewer": "Muse / 当該編集セッション",
    "reviewedAt": "2026-11-12T06:59:01+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "判定だけを行う専用モデルが重みとサーバ実装付きで公開され、エージェントの分岐判断を小さな部品に置き換える選択肢が増えた",
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
    "limitation": "性能はすべてKakaoの測定で独立検証はない。対応言語は韓国語と英語のみ。実行には同社提供コードの読み込みが必要になる"
  },
  "corrections": []
}
```

Kakaoが11月6日、Kanana-2-v-decide-3b-2611の重みを公開した。文章を生成しない意思決定専用のモデルで、状態と質問を埋め込みに変換し、候補の埋め込みとの類似度から選択・可否・スコアの確率分布を返す。対応言語は韓国語と英語で、日本語は対象外。ここが実用上の大きな制限になる。土台は視覚エンコーダ0.49Bと言語モデル3.18Bの計3.67Bで、入力はテキスト、JSON、会話履歴に画像最大10枚、最大20,480トークン。性能はKakaoの測定で、公開ベンチの平均61.23は比較対象中で首位とされる一方、テキストのみのDecision IndexではBase LabsのJoey-1（63.31）が本モデルの61.34を上回る。独立検証はまだない。導入はtransformersのカスタムコード実行が前提で、標準ライブラリだけのHTTPサーバも同梱される。ライセンスはKanana Open Licenseで、API提供やSIなど商用形態によってはKakaoの別途ライセンスが要る。判定を生成から切り離す部品がオープンに出た点が初動として面白い。
