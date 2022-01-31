const beastsDirectory = 'Wild Shapes'
const target = canvas.tokens.controlled[0]

const buildDialogContent = () => {
    const head ='<form><div class="form-group"><label>Wildshapes: </label><select id="wildShapeBeasts">'
    const tail = '</select></div></form>'
    const options = game.folders.getName(beastsDirectory).content.reduce((options, beast) => {
        return options + `<option value="${beast.data._id}">${beast.data.name}</option>`
    }, '')
    return `${head}${options}${tail}`   
}

const transform = async () => {
    const newFormId = $('#wildShapeBeasts').find(":selected").val()
    const newForm = game.actors.get(newFormId)
    actor.transformInto(newForm, {
        keepMental: true,
        mergeSaves: true,
        mergeSkills: true,
        keepBio: true,
        keepClass: true,
    })
    console.log(newFormId)
}

const inWildshape = () => actor.data.flags.dnd5e?.isWildshape || false
const toggleWildshape = () => actor.data.flags.dnd5e.isWildshape = !inWildshape()

if (!inWildshape()) {
    new Dialog({
        title: "vooders-wildshape",
        content: buildDialogContent(),
        buttons: {
            yes: {
                icon: '<i class="fas fa-paw"></i>',
                label: "Transform",
                callback: transform
            }
        }
    }).render(true)
} else {
    console.log('in wildshape')
}
