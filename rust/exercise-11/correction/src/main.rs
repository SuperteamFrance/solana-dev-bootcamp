#[derive(Debug)]
enum Transport {
    Car(String),
    Bike,
    Train(u32),
}

struct Trip {
    destination: String,
    mode: Transport,
}

fn main() {
    let trip = Trip {
        destination: String::from("Paris"),
        mode: Transport::Train(1234),
    };

    println!("Trip to {:?} using {:?}", trip.destination, trip.mode);
}