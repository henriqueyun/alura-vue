export default class FotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}')
    }

    cadastrar(foto) {
        return this._resource.save(foto)
    }

    listar() {
        return this._resource
        .query()
        .then(res => res.json())
    }

    excluir(id) {
        return this._resource.delete({ id })
    }
}