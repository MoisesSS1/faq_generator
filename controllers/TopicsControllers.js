//models
const { ContentModel, SectorsModel } = require('../models/AdminModel')

//helpers
const checkUserForToken = require('../helpers/checkUserForToken')

//rotas para os Admins
//cria tópico, salvar id e titulo no array de areas, dentro de Model de setores
exports.create = async (req, res) => {
    const user = await checkUserForToken(req)
    console.log(req.files)
    //check user is admin
    if (user.isAdmin !== true) {
        return res.status(401).json({ message: "Area somente para usuários administradores!" })
    }

    const { area, sectorAcess, title, steps, obs } = req.body

    //tratando dados
    const areaCheck = area && area.trim().toUpperCase()
    const titleCheck = title && title.trim().toUpperCase()
    const sectorAcessCheck = sectorAcess && sectorAcess.trim().toUpperCase()

    if (!areaCheck || !titleCheck || !steps) {
        return res.status(401).json({ message: "Preencha os dados corretamente!" })
    }

    //checa se setor existe
    try {
        const checkSectorExist = await SectorsModel.findOne({ admin: user._id, sector: sectorAcess })

        if (checkSectorExist === null) {
            return res.status(401).json({ message: "Setor não existe, crie o setor e depois um tópico nele!" })
        }
    } catch (error) {
        return res.status(401).json({ message: "Erro ao checar se setor existe, tente mais tarde!" })
    }

    //salva tópico no banco de dados
    try {
        const ContentSave = {
            admin: user._id,
            area: areaCheck,
            sectorAcess: sectorAcessCheck,
            title: titleCheck,
            obs: obs,
            steps: steps
        }

        const contentDB = await ContentModel.create(ContentSave)
        //adiciona titulo e id do tópico no array de sectors
        const refAreaAndTopics = {
            idPub: contentDB._id,
            title: contentDB.title
        }


        //checar se a area está cadastrada no banco
        //busca todos os setores do banco, para atualizar as areas e o id das pubs
        const sectorDB = await SectorsModel.findOne({ admin: user._id, sector: sectorAcess })

        let checkAreaExist;
        let check = sectorDB.areaAndTopics.map((obj) => {
            let checkInObj = obj[areaCheck]
            if (checkInObj) {
                checkAreaExist = true
            }
        })

        //se nao estiver cria a area e dentro dela adiciona os dados
        //cria um novo elemento para adicionar no banco, incluindo a nova propriedade
        if (!checkAreaExist === true) {
            const refAreaAndTopicsEdit = {
                [areaCheck]: [
                    refAreaAndTopics
                ]
            }
            const sectorDBAdd = await sectorDB.areaAndTopics.push(refAreaAndTopicsEdit)
            const updateSector = await SectorsModel.findOneAndUpdate({ admin: user._id, sector: sectorAcess }, sectorDB)
        }


        //caso esteja, apenas adicionar a coleção
        if (checkAreaExist === true) {
            const sectorDBAdd = sectorDB.areaAndTopics.map((obj) => {
                let checkInObj = obj[areaCheck]
                if (checkInObj) {
                    let objUpdate = obj[areaCheck].push(refAreaAndTopics)

                    return objUpdate
                }
                return obj
            })

            const updateSector = await SectorsModel.findOneAndUpdate({ admin: user._id, sector: sectorAcess }, sectorDB)
        }



        return res.status(201).json({ message: "Tópico criado com sucesso!", data: contentDB })

    } catch (error) {
        return res.status(401).json({ message: "Erro ao salvar tópico, tente mais tarde!" })
    }
}
//exibir tópicos de determinado setor para o admin
exports.getAreas = async (req, res) => {
    const user = await checkUserForToken(req)
    const id = req.params.id

    if (user.isAdmin !== true) {
        return res.status(401).json({ message: "Area somente para administradores!" })
    }

    try {
        const contentData = await SectorsModel.find({ admin: user._id, _id: id })
        return res.status(200).json({ data: contentData })

    } catch (error) {
        return res.status(401).json({ message: "Erro ao buscar setores no banco de dados!" })
    }
}
//exclui o tópico, deleta id e titulo do array de areas, dentro do model de setores e excluir o conteudo
exports.deleteTopic = async (req, res) => {
    const user = await checkUserForToken(req)
    const { sector, id } = req.params

    if (user.isAdmin !== true) {
        return res.status(401).json({ message: "Area somente para administradores!" })
    }

    try {
        //verifica a area do tópico
        const topicDB = await ContentModel.findOne({ _id: id, admin: user._id }, 'area')
        const area = topicDB.area
        console.log(area)
        //lista os tópicos do setor
        const sectorDB = await SectorsModel.findOne({ admin: user._id, sector: sector })

        //filtra os tópicos da area enviada
        const sectorDBAdd = await sectorDB.areaAndTopics.filter((obj => obj[area]))[0]

        //acha o indice da area
        const indexSector = await sectorDB.areaAndTopics.findIndex((obj) => {
            return Object.keys(obj) == area
        })
        //exclui o item do array
        const newDataSector = await sectorDBAdd[`${area}`].filter((data => data.idPub != id))
        //substitui o array antigo da area pelo newData(array atualizado)
        sectorDB.areaAndTopics[indexSector][area] = newDataSector
        //salvar os dados atualizados no banco
        await SectorsModel.updateOne({ admin: user._id, sector: sector }, sectorDB)

        //excluir do banco de
        await ContentModel.deleteOne({ admin: user._id, _id: id })

        return res.status(200).json({ message: "Tópico excluido com sucesso!" })

    } catch (error) {
        return res.status(401).json({ message: "Houve um erro ao excluir o tópico" })
    }
}



//rotas para os funcionários
//retorna a area e os titulo disponiveis de acordo com o setor do funcionário
exports.areaAndTitle = async (req, res) => {
    const user = await checkUserForToken(req)

    try {
        const areaAndTitle = await SectorsModel.findOne({ admin: user.admin, sectorAcess: user.sector }, 'areaAndTopics')
        return res.status(200).json({ data: areaAndTitle })
    } catch (error) {
        return res.status(401).json({ message: "Erro ao buscar os titulos, tente mais tarde" })
    }
}
//rota que pega o nome do tópico e filtra os tópicos disponiveis com aquele nome
exports.getTopics = async (req, res) => {
    const user = await checkUserForToken(req)
    const idTitle = req.params.id

    if (user.isAdmin) {
        return res.status(200).json({ message: "Como você é admin não será possivel especificar o tópico!" })
    }

    try {
        const contentData = await ContentModel.find({ admin: user.admin, _id: idTitle })
        return res.status(200).json({ data: contentData })

    } catch (error) {
        return res.status(401).json({ message: "Erro ao buscar tópicos dessa area, tente mais tarde!" })
    }

}

