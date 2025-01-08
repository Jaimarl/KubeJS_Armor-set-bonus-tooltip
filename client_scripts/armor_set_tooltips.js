// Добавлять комплекты здесь
// Добавление всех частей брони не обязательно. В тултипе будут отображаться только указанные части.
// Число в конце - количество строк описания бонуса.
// Например, число 3 означает, что в файл локализации нужно добавить 3 строки "set.<название>.<номер>", где номер - числа от 1 до 3 включительно. 
const armor_sets = {
    assassin: [{
        'helmet':     'rogues:assassin_armor_head',
        'chestplate': 'rogues:assassin_armor_chest',
        'leggings':   'rogues:assassin_armor_legs',
        'boots':      'rogues:assassin_armor_feet',
    }, 2]
}



ItemEvents.tooltip(event => {

    let sets = []
    for (const [key, value] of Object.entries(armor_sets)) {sets.push(key)}

    sets.forEach(set => {

        let armor_parts = []
        let parts = []
        for (const [key, value] of Object.entries(armor_sets[set][0])) {
            armor_parts.push(value)
            parts.push(key)
        }

        event.addAdvanced(armor_parts, (item, advanced, text) => {

            if (!event.shift) {
                text.add(1, Text.translate('set.summary'))
                if (text.get(2).string != '') {text.add(2, '')}
            } else {
                let line = 2
                let player = Client.player
                let equipment = {
                    'helmet': player.headArmorItem.id,
                    'chestplate': player.chestArmorItem.id,
                    'leggings': player.legsArmorItem.id,
                    'boots': player.feetArmorItem.id,
                }

                text.add(1, [ Text.translate('set.part').gold(), Text.gold(' ['), Text.translate(`set.${set}.name`).gold(), Text.gold(']') ])

                parts.forEach(part => {
                    let id = armor_sets[set][0][part]

                    if (equipment[part] == id) {
                        text.add(line, [ Text.green(' \u2507 '), Text.translate(`set.${part}`).green() ])
                    } else {
                        text.add(line, [ Text.darkGray(' \u2507 '), Text.translate(`set.${part}`).darkGray(), ' ', Item.of(id).displayName.string ])
                    }

                    line += 1
                })

                let set_match = []
                if (armor_sets[set][0]['helmet']) {
                    if (armor_sets[set][0]['helmet'] == equipment['helmet']) {set_match.push(true)} else {set_match.push(false)}}
                if (armor_sets[set][0]['chestplate']) {
                    if (armor_sets[set][0]['chestplate'] == equipment['chestplate']) {set_match.push(true)} else {set_match.push(false)}}
                if (armor_sets[set][0]['leggings']) {
                    if (armor_sets[set][0]['leggings'] == equipment['leggings']) {set_match.push(true)} else {set_match.push(false)}}
                if (armor_sets[set][0]['boots']) {
                    if (armor_sets[set][0]['boots'] == equipment['boots']) {set_match.push(true)} else {set_match.push(false)}}

                if (set_match.includes(false)) {
                    text.add(line, [ Text.translate('set.bonus').gold(), Text.red(' ['), Text.translate('set.bonus.inactive').red(), Text.red(']') ])
                } else {
                    text.add(line, [ Text.translate('set.bonus').gold(), Text.green(' ['), Text.translate('set.bonus.active').green(), Text.green(']') ])
                }
                line += 1

                Array.from(Array(armor_sets[set][1]).keys()).forEach(int => {
                    if (set_match.includes(false)) {
                        text.add(line, [ Text.darkGray(' \u2507 '), Text.translate(`set.${set}.${int + 1}`).darkGray() ])
                    } else {
                        text.add(line, [ Text.green(' \u2507 '), Text.translate(`set.${set}.${int + 1}`).green() ])
                    }

                    line += 1 
                })

                text.add(line, '')
            }

        })

    })

})
