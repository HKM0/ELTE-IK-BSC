module Mateteljes where

-- 1. Gyak

inc :: Int -> Int
inc x = x+1

lesser_heal :: Int -> Int
lesser_heal a = inc(inc(inc a))

lookout :: Int -> Int -> Bool
lookout a b = a > (b `div` 10)

volume :: Int -> Int -> Int
volume a b = a + b * (a `mod` 12)

-- 2. Gyak

type CurrentDistrict = Int 
type NextDistrict = Int 
type HealthDamage = Int 
type ArmorDamage = Int 
type Health = Int 
type Armor = Int 
type Enhance = Int

move :: (CurrentDistrict , NextDistrict) -> NextDistrict
move (current, next) = next

arcane_missiles :: (HealthDamage , ArmorDamage) -> (Health , Armor) -> (Health , Armor)
arcane_missiles (damage1, damage2) (health, armor) = (health - damage1, armor - damage2)

arcane_missiles_mark_1 :: Enhance -> (HealthDamage , ArmorDamage) -> (Health , Armor) -> (Health , Armor)
arcane_missiles_mark_1 enhance (damage1, damage2) (health, armor) = (health - (damage1 * enhance), armor - (damage2 * enhance))

arcane_blast :: (HealthDamage , ArmorDamage) -> (HealthDamage , ArmorDamage) -> (Health , Armor) -> (Health , Armor)
