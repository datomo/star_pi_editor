export const normal_gpio = {
    3: 2,
    5: 3,
    7: 4,
    11: 17,
    13: 27,
    15: 22,
    19: 10,
    21: 9,
    23: 11,
    29: 5,
    31: 6,
    33: 13,
    35: 19,
    37: 26,
    8: 14,
    10: 15,
    12: 18,
    22: 25,
    24: 8,
    26: 7,
    32: 12,
    36: 16,
    38: 20,
    40: 21
};

export const gpio_normal = {
    2: 3,
    3: 5,
    4: 7,
    17: 11,
    27: 13,
    22: 15,
    10: 19,
    9: 21,
    11: 23,
    5: 29,
    6: 31,
    13: 33,
    19: 35,
    26: 37,
    14: 8,
    15: 10,
    18: 12,
    23: 16,
    24: 18,
    25: 22,
    8: 24,
    7: 26,
    12: 32,
    16: 36,
    20: 38,
    21: 40
}



export const gpio_2_normal = (pin) => {
    console.log(pin)
    if (pin in gpio_normal) {
        return gpio_normal[pin];
    }else {
        return "";
    }
}



export const normal_2_gpio = (pin) => {
    if (pin in normal_gpio) {
        return normal_gpio[pin];
    }else {
        return "";
    }
}
