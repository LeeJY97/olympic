const INITIAL_STATE = {
    name: '',
    gold: 0,
    silver: 0,
    bronze: 0,
}

const FORM_INPUT_PROPERTIES = [
    {
        title: '국가명',
        type: 'text',
        property: 'name',
    },
    {
        title: '금',
        type: 'number',
        property: 'gold',
    },
    {
        title: '은',
        type: 'number',
        property: 'silver',
    },
    {
        title: '동',
        type: 'number',
        property: 'bronze',
    },
]

export default { INITIAL_STATE, FORM_INPUT_PROPERTIES };