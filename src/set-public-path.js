import { setPublicPath } from 'systemjs-webpack-interop'

try {
    setPublicPath('@tmcp/abnormality-fe', 2)
} catch (e) {
    console.log('For stand alone')
    console.log(e.message)
}