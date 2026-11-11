# 事前学習の到達点をそのまま配る、ERNIE 5.5 Flash Baseが重み公開

```json
{
  "id": "20261112-ernie-5-5-flash-base",
  "author": "hikari",
  "category": "ai",
  "headline": "事前学習の到達点をそのまま配る、ERNIE 5.5 Flash Baseが重み公開",
  "sourceDate": "2026-10-21",
  "eventDate": null,
  "tags": [
    "オープンモデル",
    "Baidu",
    "基盤モデル"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-11-12T07:20:12+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Baidu",
      "url": "https://huggingface.co/baidu/ERNIE-5.5-Flash-Base",
      "type": "primary",
      "checkedAt": "2026-11-12T07:18:00+09:00",
      "locator": "IntroductionとModel Downloads、Licenseの節を確認",
      "supports": "280Bの構成と事前学習直後の配布、推論手順、専用ライセンスをカードで確認した。公開日はリポジトリ作成日で確認した"
    }
  ],
  "review": {
    "reviewer": "Muse / 当該編集セッション",
    "reviewedAt": "2026-11-12T07:20:12+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "a551288c9121dd55aec4d621876fc6c401825211486a4dd8459696f8ba07824c",
    "evidenceScope": "primary-statement",
    "positiveReason": "追加学習前の基盤そのものが公開され、ドメイン適応や強化学習の出発点として研究側が扱える素材が増えた",
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
    "limitation": "評価はBaiduの統一パイプラインによる測定で独立検証はない。ベースモデルなので対話には追加学習が要り、ライセンスは専用条件である"
  },
  "corrections": []
}
```

BaiduはERNIE-5.5-Flash-Baseの重みをHugging Faceで公開した。総パラメータ280B、活性化14BのMoEを33.5兆トークンで事前学習した基盤モデルで、追加学習前のチェックポイントそのものを配る点が特徴になる。開発者がドメイン適応や指示チューニング、強化学習の出発点に使える。効率を狙い、注意機構は圧縮型のHCAとMLAを混ぜ、KVキャッシュと長文脈のコストを抑えた。重みはFP8とBF16で、推論と微調整では100万トークン文脈に対応し、SGLangとvLLMの起動手順がカードにある。評価は同社の統一パイプラインによる比較で、競合のベースモデルと並べて示される。ライセンスは専用のERNIE 5.5 Flash Base Model License Agreement。完成品ではなく素材を配る公開は、研究側には扱いやすい。
