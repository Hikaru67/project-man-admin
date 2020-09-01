/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const MAX_EMAIL_LENGTH = 255
const MAX_USER_NAME_LENGTH_IN_EMAIL = 64

/**
 * Check numberic
 */
const numericValidator = (name = '値') => {
  return (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const text = String(value)

    if (!/^[0-9]+$/.test(text)) {
      callback(new Error(parent.$nuxt.$t('messages.error.numeric', { name })))
    } else {
      callback()
    }
  }
}

/**
 * Check decimals
 */
const decimalsValidator = (name = '値') => {
  return (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const text = String(value)
    const regex = /^\d+(\.\d{1,6})?$/gim

    if (!regex.test(text)) {
      callback(new Error(parent.$nuxt.$t('messages.error.decimal', { name })))
    } else {
      callback()
    }
  }
}

/**
 * Checkalphabe and numberic
 */
const alphabeNumbericValidator = (name = '値') => {
  return (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const text = String(value)

    if (text.length > 0 && !/^[a-zA-Z0-9]+$/.test(text)) {
      callback(new Error(parent.$nuxt.$t('messages.error.alphabe_numeric', { name })))
    } else {
      callback()
    }
  }
}

/**
 * Check including the email format.
 */
const emailValidator = (name = 'メールアドレス') => {
  return (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const email = String(value)
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim

    if (email.length > 0 && !regexp.test(email.trim())) {
      callback(new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name })))
    } else if (email.trim().length > MAX_EMAIL_LENGTH) {
      callback(new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name })))
    } else {
      const emailParts = email.trim().split('@')
      if (!emailParts.length) {
        callback(new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name })))
      }

      const userNamePart = emailParts[0]
      if (userNamePart.trim().length > MAX_USER_NAME_LENGTH_IN_EMAIL) {
        callback(new Error(parent.$nuxt.$t('messages.error.bad_email_format', { name })))
      }

      callback()
    }
  }
}

/**
 * Check url
 */
const urlValidator = (name = 'URL') => {
  return (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const text = String(value)
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    if (!regex.test(text)) {
      callback(new Error(parent.$nuxt.$t('messages.error.invalid_format', { name })))
    } else {
      callback()
    }
  }
}

const Validator = {
  numericValidator,
  decimalsValidator,
  alphabeNumbericValidator,
  emailValidator,
  urlValidator
}

export default ({ app, store }, inject) => {
  inject('validator', Validator)
}