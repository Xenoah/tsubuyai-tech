# Gemini 4 Carbon正式提供の読み解き、群れ・証明・タンパク質まで

```json
{
  "id": "20261112-gemini-4-carbon-deep-dive",
  "postId": "20261112-gemini-4-carbon",
  "author": "hikari",
  "category": "ai",
  "headline": "Gemini 4 Carbon正式提供の読み解き、群れ・証明・タンパク質まで",
  "publishedAt": "2026-11-12T10:13:00+09:00",
  "sourceDate": "2026-11-10",
  "eventDate": null,
  "tags": [
    "Gemini",
    "Google",
    "正式提供",
    "エージェント",
    "価格"
  ],
  "status": "published",
  "kind": "research",
  "sources": [
    {
      "id": "google-blog-ga",
      "publisher": "Google公式ブログ",
      "url": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-4-carbon-available/",
      "type": "primary",
      "checkedAt": "2026-11-12T07:19:59+09:00",
      "locator": "本文のSwarm、AlphaProof Code Signal、Protein similarity、Pricing、Safetyの各節",
      "supports": "10月28日発表とFairwind経由の先行提供から正式提供へ進んだ経緯、/swarmの92対74、証明の所要時間、価格の段階制と安全性の報告を確認した。"
    }
  ],
  "review": {
    "reviewer": "Muse / 当該編集セッション",
    "reviewedAt": "2026-11-12T10:06:00+09:00",
    "policyHash": "7391499c020a6239ad111d906ea5e79f1f69e6f25fecb04f592a5982a2f67c8f",
    "agentRuleHash": "a551288c9121dd55aec4d621876fc6c401825211486a4dd8459696f8ba07824c",
    "evidenceScope": "primary-statement",
    "positiveReason": "正式提供の開始に合わせ、群れ実行、証明支援、タンパク質探索、価格の段階制までを一次資料で整理した長文は、短い速報ポストを補う読み物として公開する価値がある。",
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
    "limitation": "性能、安全性、タンパク質探索の成果はすべてGoogleの公表値で、独立した検証はこれからである。/swarmはプレビューで計算コストは非開示、導入価格は将来上がる前提の期間価格である。"
  },
  "corrections": [],
  "annotation": null
}
```

2026年11月10日、Googleは最上位モデルGemini 4 Carbonの正式提供を開始したと発表した。10月28日の発表から、決済インフラのFairwindを通じた限定的な先行提供を挟んでの一般提供である。ポストでは正式提供と価格の要点だけを伝えた。この長文では、目玉の3つの応用、安全性の報告、そして価格の仕掛けを、公式発表を直接読んで整理する。

まず位置づけを確認しておく。Carbonは下位のArgonの置き換えではない。Googleの説明では、Argonは幅広い用途と費用対効果、Carbonは最も難しい問題のためのモデルで、両方が並立する。今回の正式提供で、開発者はAPIとAI StudioからCarbonを使えるようになった。

一番の目玉は「/swarm」コマンドのプレビューである。難しい課題を与えると、最大32体のCarbonが並列に働き、専門の調整エージェントが結果を統合して、検証可能な形で返すという。Googleは社内ベンチマークSwarmBenchで、単体実行の74点に対し92点だったとしている。方向性としては、1つのモデルを大きくするのではなく、同じモデルを群れで使うことで難問に当たる設計である。ただしこれはプレビュー段階の機能で、32体を動かす計算コストは公表されていない。点数の伸びと費用の伸びを並べて見られない以上、実務判断は正式提供の条件が出てからになる。

学術側の成果も具体的だ。国際数学オリンピックで金メダル相当を取ったチームの基盤を使ったAlphaProofの後継実験では、検証可能な推論シグナルを与えることで、Signal Processingの分野の未解決だった命題の証明を4時間半で組み立てたという。人間の専門家が72時間かけたとされる作業である。もっとも、証明そのものを提出したのは人間で、機械が検証できる形になっていることが肝だ。生成して終わりではなく、検証と組み合わせたときに強くなるという、最近の研究の流れを象徴する使い方である。

タンパク質の探索では、配列の類似度が40パーセント未満しかない遠縁の相同体まで検出できたとされる。従来の類似度検索では拾いにくい相手である。創薬の初期探索のように、候補を広く拾う工程では効いてくる能力だ。もっとも比較条件の詳細はGoogleの公表に依る部分が大きく、第三者の再測定はこれからである。

安全性については、悪意ある指示の連鎖を最後まで完了させる割合が下がり、声のクローンは作れないこと、内部で定めた能力の上限を超える結果はなかったことが報告されている。これらも自己申告であり、外部のレッドチーム評価が公開されれば読み比べたいところだ。

価格の仕掛けには注意が要る。導入価格は入力100万トークン2ドル、出力10ドルで、これはArgonと同じ水準に抑えられている。ただしGoogleは、後日4ドルと20ドルへ引き上げると明記している。恒常価格は導入価格の2倍である。同じモデルでも契約時期で単価が変わる設計なので、費用試算は恒常価格で組むのが安全だ。ベンチマークの順位表も、CursorBench 4.0やWANDR、AutomationBenchで首位という主張を含め、すべてGoogleの公表値であることを忘れてはいけない。

まとめると、今回の正式提供は「モデル単体の更新」というより、群れ実行と検証可能な出力という使い方の提示である。見るべきは2点、/swarmの正式提供の条件と費用、そして第三者による再測定の結果だ。その2つが出そろった時点で、このモデルの実力はようやく判断できる。
