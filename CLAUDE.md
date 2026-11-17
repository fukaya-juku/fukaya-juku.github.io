# 学習空間 深谷上柴教室 ホームページ

Netlify がこのリポジトリの main ブランチを自動で公開する静的サイト（ビルドなし）。
main に push すると数分で公開サイトに反映される。

## 構成
- index.html（トップ）, tsuyomi.html（強み）, koushu.html（講習）, shogaku.html（小学生）,
  chugaku.html（中学生）, koukou.html（高校生）, jisseki.html（実績）, taiken.html（無料体験）, oshirase.html（お知らせ）
- assets/style.css … 全ページ共通のデザイン（スマホ用は @media (max-width:840px) のブロック）
- assets/site.js … メニュー、スライダー、画像のタップ拡大、トップへ戻る

## デザイン（「ノートと赤ペン」）
- 背景は方眼ノート、文字と枠は濃紺（--ink）、見出しは黄色の蛍光ペン（`<span class="mk">`）、強調は赤字（--red）。トップのヒーローだけは青空と白い雲の配色。
- 書体は Noto Sans JP のみ（本文400・見出し700〜900）。丸文字・手書き風の書体は使わない（依頼者の希望）。色・角丸・影は assets/style.css 冒頭の変数を使う。
- カードは「白地＋濃紺の2px枠＋角丸14px」。ボタンは「2px枠＋下に濃紺の影」。
- 見出し（sec-title、g-title、title-band の h1 など）の文字は `<span class="mk">` で囲んで蛍光ペンを引く。
- 事例などの画像スライドは1枚ずつ大きく表示する（.slider）。画像は `<a class="zoom" data-zoom>` で囲み、タップで拡大できるようにする。

## 修正のルール
- 修正はHTMLを直接編集する。ヘッダー・フッター・連絡先（LINE、電話 048-571-5050、住所）は全ページに同じものが入っているので、変えるときは9ページすべてをそろえる。
- 画像は Studio（storage.googleapis.com/studio-design-asset-files/...）から読み込んでいる。URLは変えない。
- 依頼者はスマホで閲覧・依頼する。本文は16px以上、ボタンは押しやすい大きさを保つ。
- コミットの作者は必ずリポジトリの持ち主にする（Netlifyの無料プランは持ち主以外のコミットを公開しないため）:
  `git -c user.name="gkfukayakamishiba-wq" -c user.email="357681865+gkfukayakamishiba-wq@users.noreply.github.com" commit ...`
  push 後、Netlify の公開が「Failed（Unrecognized Git contributor）」になっていないか確認する。
- 修正したら main に直接 push してよい（依頼者が承認済みの運用）。push 後、どのページの何を変えたかを短く報告する。
