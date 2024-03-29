import { DrinkName } from './name';

// TODO ビールの説明を入れる
export const menu: { name: DrinkName; detail: string }[] = [
  {
    name: 'ラポムレ ふじりんご＆洋梨ルレクチェジュース',
    detail: `ふじりんご（55%）に洋梨の貴婦人と呼ばれるルレ クチェ（45%）をミックスしたジュースです。

ルレクチェの上品な果肉感を表現するために、すりおろしたルレクチェにりんご果汁を加えたややネクター のような口当たり。`,
  },
  {
    name: `ラポムレ すりおろしりんごジュース`,
    detail: `圧搾したりんご果汁とすりおろし果肉を混ぜ合わせた、シャリシャリとした果肉感のあるリンゴジュース。砂糖、香料、着色料不使用。
ラベルがお猿なのは、ある日農作業をしている時にすぐ隣を両脇にりんごを 抱えた1匹の猿が今にもりんごを落としそうにヒョコヒョコと逃げて行くのを見て、本来は農家にとって厄介な相手になる猿が、なんだか愛おしく見えてしまったことから。`,
  },
  {
    name: `人参と林檎のジュース(赤) \/ 春庭農園`,
    detail: `南アルプスの麓にある人参畑から農薬、化学肥料を一切使用せず丁寧に育てられた人参をジュースにしました。 
人参の臭みが全くなく、フルーティな優しい甘さのジュースに仕上がりました。サラッとした口当たりでゴクゴク飲めてしまう美味しさです！`,
  },
  {
    name: `黄色い人参と林檎のジュース \/ 春庭農園`,
    detail: `人参と林檎をブレンドしたジュース。 マンゴーやパイナップルを想わせるフルーティな味わいが特徴です。 

栽培少量のため、販売数量わずか180本。人参嫌いのお子さんでもきっとスルスル飲めちゃう美味しさです。`,
  },
  {
    name: `うんしゅうみかんジュース`,
    detail: `愛媛県、石井さんのみかんジュース。無農薬で、面識のある人にしか販売していない貴重なみかんジュースです。`,
  },
  {
    name: `ファルツァー トラウベンザフト 赤`,
    detail: `産地：ドイツ ファルツ
品種：ルトギーザー主体、シュペートブルグンダー、ドルンフェルダー

非常に濃厚ですが、果実味のきれいな葡萄品種ばかり使用しているので、贅沢ながらもバランスのよい味わいに仕上がっています。`,
  },
  {
    name: `ファルツァー トラウベンザフト 白`,
    detail: `産地：ドイツ ファルツ
品種：ミュラー・トゥルガウ主体、ケルナー、バッフス、モリオ・ ムスカート

非常に濃厚ですが、果実味のきれいな葡萄品種ばかり使用しているので、贅沢ながらもバランスのよい味わいに仕上がっています。`,
  },
  {
    name: `ポール ジロー スパークリング グレープジュース 2022`,
    detail: `年に一度の新ヴィンテージ。

フランスから届いた、ノンアルコールのぶどうスパークリングです。
フランスのコニャック地方グランシャンパーニュ地区で高品質のコニャックを作る生産者、「ポールジロー」が生み出す、無添加のぶどうスパークリングジュース。

ノンアルコールながらも、生産地のテロワールをそのままボトリングしたような香り高く深い味わいです。アルコールを控えている方もパーティーでワインを飲んでいるような気分が味わえます。`,
  },
  {
    name: `ミューレ アルザス アッサンブラージュ`,
    detail: `産地：フランス アルザス 
品種：ピノ・ブラン、シルヴァネール、リースリング、ピノ・グリのブレンド 

アロマティックで華やかな香り。柑橘のようなフレッシュ感があり飲みごごちのいいエレガントな白。`,
  },
  {
    name: `レ ヴァン ヴィヴァン デラ空洞 2022`,
    detail: `産地：日本 長野 
品種：デラウェア（山形県産） 

山形県産のデラウェアを購入して造ったヌーヴォー。 
染み込むような飲み心地。優しい味わいです。`,
  },
  {
    name: `デ バルトリ ソーレ エ ヴェント 2021`,
    detail: `産地：イタリア シチリア 
品種：グリッロ ズィビッボ 

デ・バルトリが造る唯一のブレンド白。ズィビッポの柔らかい果実感、グリッロの酸とのバランスが非常に良いです。`,
  },
  {
    name: `ヒードラー グリューナーヴェルトリーナー レス 2021`,
    detail: `産地：オーストリア 
品種：グリューナーヴェルトリーナー
 
キレのある辛口。ほんのり柑橘系のニュアンスもあり、すっきりタイプ。`,
  },
  {
    name: `ジュリアン ペイラス ヴァン ド フランス レ コパン ダボール`,
    detail: `産地：フランス ラングドック 
品種：ルーサンヌ クレレット・ブランシュ 

南フランスらしい、あたたかい果実感があり、酸も穏やか。ジューシーなワインです。`,
  },
  {
    name: `クリスティアーノ グッタローロ ジャ 2021`,
    detail: `産地：イタリア プーリア 
品種：トレッビアーノ90%、ヴェルデーカ10% 

トレッビアーノ由来と思われるハーバルな香り、抑制のきいた果実味と土壌由来のミネラリーな余韻を備えたワインです。`,
  },
  {
    name: `イミッヒ バッテリーベルク エンキルヒャー シュテッフェンスベルク・リースリング`,
    detail: `産地：ドイツ 
品種：リースリング 

偉大な生産者、ファン・フォルクセンの元醸造責任者。親しみやすくスパイシーな独特な個性があり、目が覚めるような味わいのリースリング。`,
  },
  {
    name: `ファットリア アル フィオーレ エヴリシング イズ ア ギフト ビアンコ 2022`,
    detail: `産地：日本 宮城 
品種：セイベル62％、シャルドネ38％ 

引き締まった酸が特徴的で、飲み飽きないです。`,
  },
  {
    name: `BKワインズ ペティアン ナチュレル Oishi 2022`,
    detail: `産地：オーストラリア 
品種：ピノ・グリ 

BKの日本への深い愛から生まれたピノ・グリのペットナット。火打石のミネラル感にアデレード・ヒルズ特有の林檎の果実感、さらに香ばしさと蜜蝋のようなテクスチャーが混在した味わい。`,
  },
  {
    name: `イエロー マジック ワイナリー ヒップホップ デラ 2022`,
    detail: `産地：日本 山形 
品種：デラウェア 

音楽のヒップホップのように軽やかで軽快、そして親しみやすい味わい。微発砲なので泡は弱めですが、スティルワインとしても楽しめます。`,
  },
  {
    name: `イル ファルネート ジャンドン ロザート 2021`,
    detail: `産地：イタリア エミリアロマーニャ 
品種：ランブルスコ サラミーノ 50％、スペルゴラ 25％ 他 

ジャンドンロッソと同じ区画の黒ブドウより造られた、実験生産のロゼ。軽いタンニンと強めの色調、酸を強調した飲み心地の良さ。非常にドライで食中酒として最適なワイン。`,
  },
  {
    name: `ベルウッドヴィンヤード クラシック デラウエア ブランジュ 2022`,
    detail: `産地：日本 山形 
品種：デラウェア 

2ロットを別々に造り、発酵終了後にアッサンブラージュ。（2022はオランジュ73％、ブラン27％）棉飴やリンゴなどの華やかな香りに、しっかりした 酸味とほのかな渋みが心地よいライトな辛口オレンジワインです。`,
  },
  {
    name: `イル ファルネート ジャンドン ビアンコ 2021`,
    detail: `産地：イタリア エミリアロマーニャ 
品種：マルヴァジア ディ カンディア 
タンニン、果実を感じつつも全体を引き締める酸を感じる、カンディアら しからぬエレガントさを持ったヴィンテ ージ。`,
  },
  {
    name: `マラウーヴァ ロザレッラ 2020`,
    detail: `産地：イタリア ウンブリア 
品種：プロカニコ主体 ドゥルペッジョ ヴェルデッロ 

イチゴジャムの香りと梅っぽさがありつつ、飲み疲れしない角の無さ、そしてアルコールを強く感じない柔らかい酒質です。`,
  },

  {
    name: `グレープリパブリック アランチョーネ 2021`,
    detail: `産地：日本 山形 
品種：デラウェア 

フレッシュでみずみずしいキレの良さのあるオレンジワイン。
イチゴのシロップとオレンジのハチミツが合わさったような豊かな香りが特徴です。
味わいにもベリー系の甘酸っぱさが感じられ、奥行きに果皮や種から抽出されたタンニンがアクセントになっています。醸造、旨味と渋み、そして果実味のバランスがいい オレンジワインです。`,
  },
  {
    name: `ダイヤモンド酒造 MBA Huit 結ひ 2018`,
    detail: `産地：日本 山梨 
品種：マスカット・ベーリーＡ 

カレー・キュベＫの遅摘みの限定の少数瓶詰め品です。Huit（ユイッ）はフランス語で「8」を意味します。8番目のマスカットベリーＡ樽熟成キュヴェです。`,
  },
  {
    name: `ダイヤモンド酒造 マンマ ミーア ルージュ`,
    detail: `産地：日本 山梨 
品種：マスカット・ベーリーＡ 

ベーリーAらしいキャンディ香が香ります。舌触りはスムーズ、アルコールが控えめでとてもやわらかなタッチです。酸味も穏やかで、少し冷やして飲むのがおすすめです。`,
  },
  {
    name: `ル レザン エ ランジュ (アントナン アゾーニ) ルージュ ファーブル 2021`,
    detail: `産地：フランス ローヌ 
品種：シラー75%、グルナッシュ25% 
 
“Fable”とは、子供たちに道徳を説明するための寓話、お話しのこと。 ほんのりスパイシー、味わいは少しインキーで濃いめです。`,
  },
  {
    name: `ドメーヌ グラムノン コート デュ ローヌ ポワニェ ド レザン 2021`,
    detail: `産地：フランス ローヌ 
品種：グルナッシュ 

ワイナリーで栽培をするブドウ樹の中でも樹齢30年以下のブドウの実を使っています。熟成させるよりも、フレッシュさを感じられるあいだに飲み切るのがおすすめです。わかりやすいチャーミングな果実味。`,
  },
  {
    name: `イネディット`,
    detail: `かつて世界一予約が取れないことで知られていたスペイン・カタルーニャ地方のレストラン、「エル・ブジ」が開発したプレミアムビールです。
「セレブを迎えるワインはあるが、ビールがない」というコンセプトのもと食事のためのビールとして生み出されました。
ビール好きの僕の妹一押しのビールです。
  `,
  },
  {
    name: `ブリュードッグ パンクIPA`,
    detail: `ブリュードッグは2007年UK・スコットランドで“大量に工場生産されたラガー”か“古臭くて根本的に面白みのないエール” しかない当時のUK市場に“クラフトビール”カテゴリーを作ることを目指して2007年創業。
グレープフルーツ、パイナップル、ライチのようなトロピカルフルーツとキャラメルの香りが漂い、最後にスパイシーな苦味が残ります。`,
  },
  {
    name: `ブリュードッグ ヘイジージェーン`,
    detail: `苦味を抑えることで、ホップ由来の爽やかなフルーティさがよりダイレクトに感じられる、スムースな飲み口が特徴のニューイングランドIPA。
無濾過で濁りをそのまま残し、モルトとホップの旨味を余すことなく閉じ込めることで、パイナップルやマンゴー、タンジェリンなどのアロマが華やかに広がる。

`,
  },
  {
    name: `ブリュードッグ クロックワーク`,
    detail: `クロックワーク　タンジェリンはタンジェリンを使用した、柑橘系フレーバーがたっぷりのセッションIPA。
一口飲めば、タンジェリンに、「シムコー」、「コロンバス」ホップ由来のグレープフルーツやライムが重なり合い、波のように押し寄せてきます！フィニッシュは香ばしいモルトとキャラメルのバックボーンに、オレンジピールと松が鮮やかに香ります。`,
  },
  {
    name: `ブリュードッグ エルビスジュース`,
    detail: `ホップとシトラスのフレーバーの研究を重ねて造り上げた、フルーティなIPA。
ホワイト＆ピンクグレープフルーツやブラッドオレンジのフルーティな香りと、マイルドな苦味にグレープフルーツのような酸味のある後味が特徴。`,
  },
  {
    name: `ブリュードッグ プラネットペールエール`,
    detail: `世界で最もサステナブルな企業をめざすブリュードッグが、より多くの人に「人間が地球でいつまでも暮らしていけるための取り組み」に目を向けてもらおうと、キーワードである「PLANET（地球）」を商品名に冠したセッショナブルなウエストコーストスタイルのペールエールです。
クラシックなアメリカンホップだけでなく、グレープフルーツの強いアロマを与える新種ホップ「タラス」を使用することで、より爽やかさを演出。シトラスやトロピカルフルーツが広がる柔らかな味わい。`,
  },
];
