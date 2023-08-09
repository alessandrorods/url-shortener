from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        # self.client.get("/Btd6h05kEx")
        self.client.post("/", json={"destination":"https://www.floramundoplanta.com.br/cesta-de-natal-com-espumante-anturio-vermelho-pelucia-e-ferrero-rocher", "enabled":True})