class space_stations extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('space_stations')
      this.fields = this.fields.concat([
          'number',
          'capacity',
          'need'
      ])
    }
  }
