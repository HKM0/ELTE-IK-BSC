
# Élkontúr kamera OpenCV-vel
import cv2

def main():
	cap = cv2.VideoCapture(0)
	if not cap.isOpened():
		print("Nem sikerült megnyitni a kamerát.")
		return
	while True:
		ret, frame = cap.read()
		if not ret:
			break
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		edges = cv2.Canny(gray, 100, 200)

		black = frame.copy()
		black[:] = 0
		# Kék körvonal fekete háttéren
		contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
		cv2.drawContours(black, contours, -1, (255, 0, 0), 2)
		cv2.imshow('Kamera - Körvonalak', black)
		if cv2.waitKey(1) & 0xFF == ord('q'):
			break
	cap.release()
	cv2.destroyAllWindows()

if __name__ == "__main__":
	main()

