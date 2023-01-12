<template>
  <div class="table__wrapper">
    <table>

      <tr v-for="row in tableRows" :key="row.id">
        <td v-for="input in row" :key="`${input.row}.${input.id}`">
          
          <input
            v-model="input.value"
            @blur="onBlur"
            :class="{  
              hidden: input.value === 0,
              yellow: (+input.value >= -1.5 && +input.value <= 1.5 && input.value != 0),
              green: +input.value > 1.5,
              red: +input.value < -1.5
            }"
            @keypress="onInput"
            readonly="true"
            @dblclick="onDblClick"
            @keyup.enter="onBlur">
            
        </td>
      </tr>

    </table>

    <button class="btn btnPrimary" @click="calcSum(0, 0, 0)">Sum</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableRows: this.$store.state.store.tableRows,
      currentRow: []
    }
  },
  created() {
    this.$store.dispatch('setData', 20)
  },
  methods: {
    onBlur(e) {
      if (e.target.value == 0 || e.target.value == '') {
        e.target.className = 'hidden'
      }
      e.target.readOnly = true
    },
    onInput(evt) {
      const event = evt || window.event
      let key = event.keyCode || event.which
      key = String.fromCharCode(key)
      const regex = /[0-9]|\./
      if( (!regex.test(key) && key !== '-') ) {
        event.returnValue = false
        if(event.preventDefault) event.preventDefault()
      }
    },
    onDblClick(e) {
      if (e.target.value == 0) {
        e.target.value = ''
      }
      if (e.target.className == 'hidden') {
        e.target.className = ''
      }
      e.target.readOnly = false
    },
    calcSum(rowIndex, inputIndex, prevInputValue, prevRowInput) {

      let row = this.tableRows[rowIndex]
      if (!row) return false
      
      // inputs from next row
      let nextRowInputs
      if (!this.tableRows[rowIndex + 1]) nextRowInputs = 0
      else {
        nextRowInputs = this.tableRows[rowIndex + 1].filter(input => {
          if (input.id === inputIndex - 1) return input
          if (input.id === inputIndex + 1) return input
          if (input.id === inputIndex) return input
        })
      }

      // this (current) input 
      let input = row.find(i => i.id == inputIndex)
      if (!input) {
        rowIndex++
        inputIndex = 0
        this.calcSum(rowIndex, inputIndex, 0)
      } else {
        
        let prevRow = [this.currentRow[inputIndex], this.currentRow[inputIndex + 1]] // inputs from previos row
        let prevRowLeftInput = this.currentRow[inputIndex] // input for next function call
        this.currentRow[inputIndex] = input.value // new input value for next row

        let currentInputValue = +input.value // new input value for next function call

        let nextInputValue = row.find(i => i.id == (inputIndex + 1)) ? row.find(i => i.id == (inputIndex + 1)).value : 0
        
        // sum calculation
        let sum = (+prevInputValue + +nextInputValue + this.getRandom(-2, 2))
        
        if (!prevRow) {
          sum += 0
        } else {
          prevRow.forEach(inp => {
            if (!inp) {
              sum += 0
            } else {
              sum += +inp
            }
          })
        }
        if (!prevRowInput) {
          sum += 0
        } else {
          sum += +prevRowInput
        }

        if (nextRowInputs == 0) {
          sum += 0
        } else {
          nextRowInputs.forEach(inp => {
            sum += +inp.value
          })
        }
        
        input.value = parseFloat(sum.toFixed(2))

        this.calcSum(rowIndex, ++inputIndex, currentInputValue, prevRowLeftInput)
      }
    },
    // random
    getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
}
</script>

<style lang="scss">
.table__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    color: rgba(0, 0, 0, 0.5);
    padding: 0 10px;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0);
    &.yellow {
      background-color: rgba($color: yellow, $alpha: .3);
    }
    &.green {
      background-color: rgba(84, 245, 84, .8);
    }
    &.red {
      background-color: rgba($color: red, $alpha: .3);
    }
    &.hidden {
      opacity: 0;
    }
  }
  .btn {
    margin-top: 25px;
  }
}
</style>