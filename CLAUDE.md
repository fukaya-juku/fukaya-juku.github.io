# 学習空間 深谷上柴教室 ホームページ

Netlify がこのリポジトリの main ブランチを自動で公開する静的サイト（ビルドなし）。
main に push すると数分で公開サイトに反映される。

## 構成
- index.html（トップ）, tsuyomi.html（強み）, koushu.html（講習）, shogaku.html（小学生）,
  chugaku.html（中学生）, koukou.html（高校生）, jisseki.html（実績）, taiken.html（無料体験）, oshirase.html（お知らせ）
- assets/style.css … 全ページ共通のデザイン（スマホ用は @media (max-width:840px) のブロック）
- assets/site.js … メニュー、スライダー、画像のタップ拡大、トップへ戻る

## 修正のルール
- 修正はHTMLを直接編集する。ヘッダー・フッター・連絡先（LINE、電話 048-571-5050、住所）は全ページに同じものが入っているので、変えるときは9ページすべてをそろえる。
- 画像は Studio（storage.googleapis.com/studio-design-asset-files/...）から読み込んでいる。URLは変えない。
- 依頼者はスマホで閲覧・依頼する。本文は16px以上、ボタンは押しやすい大きさを保つ。
- 修正したら main に直接 push してよい（依頼者が承認済みの運用）。push 後、どのページの何を変えたかを短く報告する。
