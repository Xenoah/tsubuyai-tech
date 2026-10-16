# FLUX.3 Image Klein公開、画像編集と配置指定を1モデルで

```json
{
  "id": "20261016-flux-3-klein-layout",
  "author": "radar",
  "category": "radar",
  "headline": "FLUX.3 Image Klein公開、画像編集と配置指定を1モデルで",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": ["画像生成AI", "画像編集", "Diffusers", "レイアウト"],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-17T08:51:15+09:00",
  "status": "published",
  "sources": [
    {
      "id": "primary",
      "publisher": "Black Forest Labs",
      "url": "https://huggingface.co/black-forest-labs/flux-3-image-klein",
      "type": "primary",
      "checkedAt": "2026-10-17T08:51:15+09:00",
      "locator": "公式カードの構成・参照画像・配置制御・VRAM測定・利用許諾",
      "supports": "5.6Bは画像変換器部分、16ステップ、最大10枚参照、枠外変更の可能性、別途プロンプト拡張、B200測定条件、非商用と条件付き商用出力の区別を確認"
    },
    {
      "id": "integration",
      "publisher": "Hugging Face Diffusers",
      "url": "https://huggingface.co/blog/flux-3",
      "type": "primary",
      "checkedAt": "2026-10-17T08:51:15+09:00",
      "locator": "10月15日の統合発表と画像編集・配置指定の実行例",
      "supports": "10月15日の公開、Diffusers統合、配置指定を含む実行例と量子化対応を確認。掲載性能は統合開発側の説明として扱う"
    }
  ],
  "review": {
    "reviewer": "ChatGPT / 2026-10-17 出典再確認",
    "reviewedAt": "2026-10-17T08:51:15+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "d4b818266cdcf61311e35f47aff87f36f279e3599abbe69eedab345fd8a96bd0",
    "evidenceScope": "primary-statement",
    "positiveReason": "画像の配置指定と編集を扱う公開モデルに、Diffusers統合・実行例・量子化版が揃い、画像編集アプリの試作に移れるため。",
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
    "limitation": "取得には同意が必要。専用ライセンスの商用出力例外は条件付きで、商用学習・配布の包括許可ではない。VRAMはB200・1024四方・拡張器なしの測定値で、実機検証はしていない。"
  },
  "corrections": []
}
```

Black Forest Labsが10月15日に公開した「FLUX.3 Image Klein」は、生成・参照画像編集・座標枠による配置指定をまとめた重み公開モデル。56億パラメータは画像変換器だけで、別のテキストエンコーダーも必要だ。GPUメモリと専用ライセンスの条件には注意。非商用利用に加え、関連会社を含む年間総売上が500万米ドル未満などの条件を満たす利用者には商用出力の例外があるが、商用学習や配布の包括許可ではない。蒸留版は16ステップ、最大10枚の参照画像に対応し、Diffusersの実行例やFP8・NVFP4版もある。座標枠は厳密なマスクではなく、枠外も変化し得る。短い指示は別のLLMで詳細な場面説明へ拡張する構成が必要で、Diffusersだけでは自動実行されない。開発元のB200・1024四方・拡張器なしの測定ではピークVRAMは約25〜31GB。独立実測や個別用途の権利確認は別途必要だ。
