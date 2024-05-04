export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email required*"
    if (!re.test(email)) return 'Please enter a valid email address!'
    return ''
  }