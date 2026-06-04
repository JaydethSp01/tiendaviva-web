// stub de datos auto-generado (seguro contra accesos a undefined)
const _arr: any = new Proxy([], { get: (t: any, p: any) => p in t ? t[p] : _arr });
const _obj: any = new Proxy({}, { get: () => _arr });
export default _obj;
