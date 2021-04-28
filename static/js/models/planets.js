class planets extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('planets')
      this.fields = this.fields.concat([
          'namep',
          'capacity',
          'mass'
      ])
    }
  }
