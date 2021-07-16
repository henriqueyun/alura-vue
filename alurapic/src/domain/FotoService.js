export default class FotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}')
    }

    cadastrar(foto) {
        if (foto._id) {
            return this._resource.update({ id: foto._id }, foto)
        } else { 
            return this._resource.save(foto)
        }
    }

    listar() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.error(err)
                throw new Error('Não foi possível obter as fotos.')
            })
    }

    excluir(id) {
        return this._resource.delete({ id })
            .then(null, err => {
                console.error(err)
                throw new Error('Não foi possível remover a foto.')
            })
    }

    buscar(id) {
        return this._resource
            .get({ id })
            .then(res => res.json())
    }
}