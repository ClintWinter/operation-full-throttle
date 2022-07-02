export const ZERO          = f => x => x
export const ONE           = f => x => f(x)
export const TWO           = f => x => f(ONE(f)(x))
export const THREE         = f => x => f(TWO(f)(x))
export const FOUR          = f => x => f(THREE(f)(x))
export const FIVE          = f => x => f(FOUR(f)(x))
export const SIX           = f => x => f(FIVE(f)(x))
export const SEVEN         = f => x => f(SIX(f)(x))
export const EIGHT         = f => x => f(SEVEN(f)(x))
export const NINE          = f => x => f(EIGHT(f)(x))
export const TEN           = f => x => f(NINE(f)(x))
export const ELEVEN        = f => x => f(TEN(f)(x))
export const TWELVE        = f => x => f(ELEVEN(f)(x))
export const THIRTEEN      = f => x => f(TWELVE(f)(x))
export const FOURTEEN      = f => x => f(THIRTEEN(f)(x))
export const FIFTEEN       = f => x => f(FOURTEEN(f)(x))
