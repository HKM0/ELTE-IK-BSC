import pygame
import random
from abc import ABC, abstractmethod

pygame.init()

WINDOW_WIDTH, WINDOW_HEIGHT = 800, 600
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Space Shooter")

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

ENEMY_SPAWN_CHANCE = 60
POWERUP_SPAWN_CHANCE = 500
BULLET_COOLDOWN = 300
FPS = 60

font = pygame.font.Font(None, 36)
clock = pygame.time.Clock()

class GameState:
    def __init__(self):
        self.bullet_speed = 7
        self.max_bullets = 5
        self.player_speed = 5
        self.score = 0

    def game_over(self, surface, font):
        surface.fill(BLACK)
        game_over_text = font.render("GAME OVER", True, RED)
        surface.blit(game_over_text, (WINDOW_WIDTH // 2 - 80, WINDOW_HEIGHT // 2))
        pygame.display.flip()
        pygame.time.wait(5000)

class GameEntity(ABC):
    def __init__(self, image, x, y):
        self.image = image
        self.rect = self.image.get_rect(topleft=(x, y))

    def draw(self, surface):
        surface.blit(self.image, self.rect)

    @abstractmethod
    def update(self):
        pass

class Player(GameEntity):
    def __init__(self, x, y, speed, lives=3):
        image = pygame.Surface((50, 30))
        image.fill(GREEN)
        super().__init__(image, x, y)
        self.speed = speed
        self.lives = lives

    def move(self, dx):
        self.rect.x += dx
        self.rect.x = max(0, min(WINDOW_WIDTH - self.rect.width, self.rect.x))

    def lose_life(self):
        ### Kezeljük le a játékos életvesztését!
        pass
        ###

    def gain_life(self):
        ### Kezeljük le, hogy maximum 3 élete lehessen a játékosnak!
        # Ha életet szed fel, növeljük az életét!
        pass
        ###

    def update(self):
        pass

class Bullet(GameEntity):
    def __init__(self, x, y, speed):
        image = pygame.Surface((5, 15))
        image.fill(WHITE)
        super().__init__(image, x, y)
        self.speed = speed

    def update(self):
        self.rect.y -= self.speed
        return self.rect.y > -self.rect.height #ha kihalad a képernyőről teljesen

class Enemy(GameEntity):
    def __init__(self, x, y, speed):
        image = pygame.Surface((40, 30))
        image.fill(RED)
        super().__init__(image, x, y)
        self.speed = speed

    def update(self):
        self.rect.y += self.speed
        return self.rect.y < WINDOW_HEIGHT

class PowerUp(GameEntity, ABC):
    def __init__(self, x, y, speed, color):
        image = pygame.Surface((20, 20))
        pygame.draw.circle(image, color, (10, 10), 10)
        super().__init__(image, x, y)
        self.speed = speed

    def update(self):
        self.rect.y += self.speed
        return self.rect.y < WINDOW_HEIGHT

    @abstractmethod
    def apply_effect(self, player):
        pass

class SpeedPowerUp(PowerUp):
    def __init__(self, x, y):
        super().__init__(x, y, 2, BLUE)

    def apply_effect(self, player):
        ### Növeljük a player sebességét!
        pass
        ###

class HealthPowerUp(PowerUp):
    def __init__(self, x, y):
        super().__init__(x, y, 2, YELLOW)

    def apply_effect(self, player):
        player.gain_life()

class EntityFactory:
    POWERUP_TYPES = [SpeedPowerUp, HealthPowerUp]

    @staticmethod
    def spawn_enemy():
        x = random.randint(0, WINDOW_WIDTH - 40)
        y = random.randint(-100, -40)
        return Enemy(x, y, 2)

    @staticmethod
    def spawn_powerup():
        x = random.randint(0, WINDOW_WIDTH - 20)
        y = random.randint(-300, -20)
        ### Válaszd ki véletlenszerűen a leidézendő erősítés, idézd le az xy koordinátára!
        pass
        ###

    @staticmethod
    def spawn_bullet(player, speed):
        return Bullet(player.rect.centerx, player.rect.y, speed)

class Game:
    def __init__(self, factory):
        self.state = GameState()
        self.factory = factory
        self.player = Player(WINDOW_WIDTH // 2, WINDOW_HEIGHT - 50, self.state.player_speed)
        self.bullets, self.enemies, self.powerups = [], [], []
        self.last_shot_time = pygame.time.get_ticks()
        self.running = True

    def handle_input(self):
        keys = pygame.key.get_pressed() #eseményeket tárolja
        current_time = pygame.time.get_ticks()

        if keys[pygame.K_LEFT]:
            ### Mozogjon a játékos balra!
            pass
            ###
        if keys[pygame.K_RIGHT]:
            ### Mozogjon a játékos jobbra!
            pass
            ###
        if keys[pygame.K_SPACE] and len(self.bullets) < self.state.max_bullets:
            if current_time - self.last_shot_time >= BULLET_COOLDOWN:
                bullet = self.factory.spawn_bullet(self.player, self.state.bullet_speed)
                self.bullets.append(bullet)
                self.last_shot_time = current_time

    def update_entities(self):
        self.bullets = [bullet for bullet in self.bullets if bullet.update()] # belerakjuk, ha benne van a képernyőben
        self.enemies = [enemy for enemy in self.enemies if enemy.update()]
        self.powerups = [powerup for powerup in self.powerups if powerup.update()]

        if random.randint(1, ENEMY_SPAWN_CHANCE) == 1: #1/chance megjelenési esély
            self.enemies.append(self.factory.spawn_enemy())
        if random.randint(1, POWERUP_SPAWN_CHANCE) == 1:
            self.powerups.append(self.factory.spawn_powerup())

    def check_collisions(self):
        for enemy in self.enemies[:]:
            for bullet in self.bullets[:]:
                ### Végezzük el a bulletek és ellenségek összeütközését!
                # Használd a colliderect függvényt!
                pass
                ###
            ### Végezzük el a játékos és ellenség ütközését!
            pass
            ###

        for powerup in self.powerups[:]:
            if powerup.rect.colliderect(self.player.rect):
                ###Alkalmazzuk az erőnövelést, majd töröljük a listából!
                pass
                ###

    def render_entities(self):
        screen.fill(BLACK)
        self.player.draw(screen)
        ###Rajzoltassunk ki minden entitást!

        ###

        for i in range(self.player.lives):
            pygame.draw.rect(screen, RED, (WINDOW_WIDTH - (i + 1) * 30, 10, 20, 20))

    def render_score(self):
        score_text = font.render(f'Score: {self.state.score}', True, WHITE)
        screen.blit(score_text, (10, 10))

    def handle_player_alive(self):
        ### Írd meg a játékos életlogikáját! Ha meghalt, legyen vége a játéknak! 
        pass
        ###

    def run(self):
        while self.running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT: #ha bezárjuk az ablakot
                    self.running = False

            ##### Hívd meg a függvényeket!

            ###

            pygame.display.flip()
            clock.tick(FPS)

        pygame.quit() #minden pygame objektum törlése

if __name__ == '__main__':
    factory = EntityFactory()
    game = Game(factory)
    game.run()