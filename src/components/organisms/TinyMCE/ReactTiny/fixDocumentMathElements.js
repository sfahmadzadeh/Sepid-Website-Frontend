import mathTextToSvg from '../additional-plugins/mathTextToSvg'

export default function fixDocumentMathElements (doc) {
  const tinyMathEls = doc.getElementsByClassName('tiny-math')
  for (let i = 0; i < tinyMathEls.length; i++) {
    tinyMathEls[i].innerHTML = mathTextToSvg(
      tinyMathEls[i].dataset.latex
    ).innerHTML
  }
}
