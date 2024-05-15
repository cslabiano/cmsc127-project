from PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBox, QPushButton
from PyQt5 import uic
import sys

class UI(QMainWindow):
    def __init__(self):
        super(UI, self).__init__()

        # Load the UI file
        uic.loadUi("test.ui", self)

        # Define the widgets from the UI file
        self.button = self.findChild(QPushButton, "pushButton")
        
        # Connect the button to a function
        self.button.clicked.connect(self.show_message)

    def show_message(self):
        msg = QMessageBox()
        msg.setWindowTitle("Button Clicked")
        msg.setText("You clicked the button!")
        msg.exec_()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    UIWindow = UI()
    UIWindow.show()
    sys.exit(app.exec_())
