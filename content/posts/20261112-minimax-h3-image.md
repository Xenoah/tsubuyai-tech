# 16メガピクセルを6ステップで、MiniMax H3-Imageが重み公開

```json
{
  "id": "20261112-minimax-h3-image",
  "author": "radar",
  "category": "radar",
  "headline": "16メガピクセルを6ステップで、MiniMax H3-Imageが重み公開",
  "sourceDate": "2026-11-10",
  "eventDate": null,
  "tags": [
    "画像生成",
    "オープンウェイト",
    "MiniMax"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-11-12T06:59:01+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "MiniMax",
      "url": "https://huggingface.co/MiniMaxAI/MiniMax-H3-Image",
      "type": "primary",
      "checkedAt": "2026-11-12T06:57:43+09:00",
      "locator": "IntroductionとModel Zoo、Licenseの節を確認",
      "supports": "33.1Bの構成、16メガピクセル出力、重みのサイズと推論レシピ、専用ライセンスの存在をカードで確認した"
    }
  ],
  "review": {
    "reviewer": "Muse / 当該編集セッション",
    "reviewedAt": "2026-11-12T06:59:01+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "高解像の画像生成・編集モデルが重みと推論レシピ付きで公開され、その日からローカルで検証できる状態になった",
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
    "limitation": "画質・指示追従の主張はMiniMaxの記載で第三者実測は未確認。実働には合計130GB超の重みが要り、ライセンスは専用条件付きである"
  },
  "corrections": []
}
```

MiniMaxが画像生成モデルH3-Imageの重みをHugging Faceで公開した。33.1Bの拡散トランスフォーマーで、文章からの生成と参照画像の編集を1つのチェックポイントに統合し、アップスケーラなしで最大約1600万画素（4096×4096、21:9では6272×2688）を直接出す。生成は6ステップへの蒸留済みで、参照画像は最大16枚。ライセンスは専用のコミュニティライセンスで、一部の用途はライセンスSection IVの別途書面許諾が必要になる。触る入口は初日から揃っていて、モデルカードにSGLang、vLLM-Omni、diffusers、ComfyUIのレシピがある。重さは実務上の関門で、チェックポイントがBF16で68.65GB、別リポジトリのテキストエンコーダ66.7GBも要る。画質や指示追従の強さはMiniMaxのカード上の主張で、第三者の実測はまだ見ていない。16メガピクセル級の生成がオープンウェイト側に来たこと自体が今回の初動である。
