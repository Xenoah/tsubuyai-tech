# GPT-Live-1.1をChatGPT Voiceへ、APIでは文章から声を作成

```json
{
  "id": "20261016-gpt-live-1-1-voices",
  "author": "hikari",
  "category": "ai",
  "headline": "GPT-Live-1.1をChatGPT Voiceへ、APIでは文章から声を作成",
  "sourceDate": "2026-10-15",
  "eventDate": null,
  "tags": [
    "生成AI",
    "音声AI",
    "GPT-Live",
    "開発者API"
  ],
  "kind": "announcement",
  "annotation": null,
  "publishedAt": "2026-10-16T16:07:02+09:00",
  "status": "published",
  "sources": [
    {
      "id": "openai-release",
      "publisher": "OpenAI",
      "url": "https://openai.com/products/release-notes/",
      "type": "primary",
      "checkedAt": "2026-10-18T12:14:07+09:00",
      "locator": "2026年10月15日のChatGPT Voice更新と16日のGPT-Live API公開欄",
      "supports": "GPT-Live-1.1とQuipの段階提供、翌日の文章による声の生成機能のAPI一般提供、日本語2種を含む追加音声9種、作成無料とセッション課金を確認"
    },
    {
      "id": "openai-custom-voice-guide",
      "publisher": "OpenAI API",
      "url": "https://developers.openai.com/api/docs/guides/custom-voices",
      "type": "primary",
      "checkedAt": "2026-10-18T12:14:07+09:00",
      "locator": "Prompt-to-voiceの作成方法、対応先、保存上限、禁止用途・課金の説明",
      "supports": "録音不要で文章から声を生成・保存できること、GPT-Live専用でTTS等には非対応、1組織100種類上限、子供の声と他者のなりすましを禁止、AI音声の開示が必要なことを確認"
    }
  ],
  "review": {
    "reviewer": "ChatGPT GPT-6 / 2026-10-18 音声API追加発表の再確認",
    "reviewedAt": "2026-10-18T12:14:07+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "3ac515397c2eab133957712454ed2f8356fe274281ccfd89b127a9edf19dd684",
    "evidenceScope": "primary-statement",
    "positiveReason": "GPT-Liveの音声対話モデル更新に続いて、API利用者がテキストから独自の声を設計してセッションに組み込めるようになり、開発者の利用範囲が拡大したため。",
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
    "limitation": "文章から作る声はGPT-Live専用でTTS・Realtime等には非対応。ChatGPT Voiceでも使えるとは確認できない。音声は同一性・独自性を保証されず、利用制限と課金条件がある。品質の独立評価は未実施。"
  },
  "corrections": [
    {
      "date": "2026-10-18T12:14:07+09:00",
      "note": "10月16日に新たに発表されたAPI向けPrompt-to-voiceの一般提供、料金・対応先・利用制限、日本語2種類を含む新音声9種類を、15日のChatGPT Voice向け更新と区別して追記した。"
    }
  ]
}
```

OpenAIは10月15日、ChatGPT Voice向けにGPT-Live-1.1と小型版Quipの段階提供を発表。多言語のアクセントや検索中の案内表現を更新し、日本語などの音声選択肢も増やした。翌16日には別のAPI向け機能「Prompt-to-voice」を全API利用者へ一般提供した。声の特徴を文章で指定し、録音サンプルなしで声を作成・保存してGPT-Liveの会話に使い回せる。ただし生成した声はGPT-Live専用で、Text to Speech・Realtime・Chat Completions APIでは使用不可。ChatGPT Voiceへの同機能提供も今回の発表では確認できない。声の作成自体は無料だが、会話中の音声生成には通常のGPT-Live料金がかかる。保存できる声は組織あたり最大100種類。子供の声や他人のなりすましは禁止され、AI音声であることの開示も求められる。同日、API向けGPT-Liveに計9種類の声が追加され、日本語はHaremaとShida。声の独自性や音声品質は独立検証されていない。
