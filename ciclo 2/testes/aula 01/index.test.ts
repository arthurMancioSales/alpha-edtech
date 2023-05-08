import { test, expect, describe } from '@jest/globals'
import sum from '.'

describe('number operations', () => { 
    test('sum of two positive different numbers', () => {
        expect(sum(20, 10)).toBe(30)
    })

    test('sum of two different numbers, one positive, one negative', () => {
        expect(sum(-10, 10)).toBe(0)
    })

    test('sum of two equal numbers', () => {
        expect(sum(2, 2)).toBe(4)
    })
 })