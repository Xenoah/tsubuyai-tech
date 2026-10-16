# FLUX.3 Image Klein公開、画像編集と配置指定を1モデルで

```json
{
  "id": "20261016-flux-3-klein-layout",
  "author": "radar",
  "category": "radar",
  "headline": "FLUX.3 Image Klein公開、画像編集と配置指定を1モデルで",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": [
    "画像生成AI",
    "画像編集",
    "Diffusers",
    "レイアウト"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-16T20:11:44+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Black Forest Labs",
      "url": "https://huggingface.co/black-forest-labs/flux-3-image-klein",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "開発元モデルカードの機能・必要メモリ・ダウンロード制限・利用許諾",
      "supports": "5.6B画像変換器、16ステップの蒸留版、最大10枚の参照画像、bboxによる配置指示、利用条件とVRAM実測条件を確認"
    },
    {
      "id": "integration",
      "publisher": "Hugging Face Diffusers",
      "url": "https://huggingface.co/blog/flux-3",
      "type": "primary",
      "checkedAt": "2026-10-16T20:11:44+09:00",
      "locator": "10月15日の開発者解説とDiffusers実装例",
      "supports": "モデル公開日、参照画像編集、配置制御、FP8/NVFP4派生、H100上の発表元ベンチマークを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 当該編集セッション",
    "reviewedAt": "2026-10-16T20:11:44+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "新しい画像の配置指定方式に加え、配布重み・参考コード・量子化版・Diffusers統合が発表直後から揃っており試作へ移しやすいため。",
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
    "limitation": "取得には同意が必要で、専用のFLUX Kommunity Licenseの商用条件を確認すべき。VRAMは開発元の特定環境での測定値、描画性能は独立未検証。"
  },
  "corrections": []
}
```

Black Forest Labsは10月15日、重み公開型の画像生成・編集モデル「FLUX.3 Image Klein」を発表した。画像処理側は56億パラメータで、蒸留版は16ステップを基本とする。テキストからの生成、最大10枚の参照画像を使う編集、座標枠による被写体の配置指示を単一のモデルで扱い、公開直後からDiffusersの実行例やFP8・NVFP4版もある。画像編集アプリを構築する人には試す入口が明確だ。一方、短い指示だけでは品質が落ちやすく、別のプロンプト拡張モデルを使う構成が推奨される。座標枠は厳密なマスクではなく、枠外にも内容が変化し得る。開発元の1024px・B200環境では拡張器なしでもGPUメモリ約25〜31GBを要する。重み取得には利用条件への同意が必要で、ライセンスは原則非商用。商用出力の例外も条件付きで、無制限の商用利用はできない。
