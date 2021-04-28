class goods extends BaseModel {
    constructor () {
      super('goods')
      this.fields = this.fields.concat([
         'name',
          'code',
          'weight'
      ])
    }
  }
